const path = require('path')
const rootDir = require('../util/path')
const SibApiV3Sdk = require('sib-api-v3-sdk')
const { userInfo } = require('os')

require('dotenv').config()

exports.getForgotPassword = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'forgot-password.html'));
}

exports.postForgotPassword = (req, res, next) => {
    const SibApiV3Sdk = require('sib-api-v3-sdk');
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.EMAILTOKEN;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "My {{params.subject}}";
    sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
    sendSmtpEmail.sender = {"name":"John Doe","email":"example@example.com"};
    sendSmtpEmail.to = [{"email":"finono9256@syinxun.com","name":"Jane Doe"}];
    sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
    sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};

    apiInstance.sendTransacEmail(sendSmtpEmail)
        .then((data) => {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({messageId: "Internal Server Error"});
        })
}