const Razorpay = require('razorpay');
const Order = require('../models/order');

require('dotenv').config();

exports.purchasePremium = (req, res, next) => {
    
    const instance = new Razorpay( {
        key_id: process.env.RAZORPAY_KEYID,
        key_secret: process.env.RAZORPAY_SECRET
    })

    var options = {
        amount: 2500,
        currency: 'INR',
    }

    instance.orders.create(options)
    .then((order) => {
        req.user.createOrder({
            orderId: order.id,
            status: 'pending'
        })
        .then(() => {
            res.status(201).json( { orderId: order.id, key_id: process.env.RAZORPAY_KEYID });
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "Internal Server Error", error: err});
    });
    
}

exports.updateTransactionStatus = async (req, res, next) => {
    if(!req.body.success) {
        order_id = req.body.order_id
        Order.update( {
            status: 'failed'
        }, {
            where: {
                orderId: order_id
            }
        })
    } else {
        try {
            const { order_id , payment_id } = req.body;
            const promise1 = await Order.update( { paymentId: payment_id, status: 'success'}, { where: { orderId: order_id }})
            const promise2 = await req.user.update( { isPremiumUser: true }, { where: { id: req.user.id } })
            
            Promise.all( [ promise1, promise2 ] ).then(() => {
                res.status(200).json( { success: true, message: "Transaction Success" } );
            })
            .catch((err) => {
                throw new Error(err);
            })
        } catch(err) {
            console.log(err);
        }
    }
    
}

exports.isPremium = (req, res, next) => {
    res.status(200).json( { isPremiumUser: req.user.isPremiumUser } );
}

