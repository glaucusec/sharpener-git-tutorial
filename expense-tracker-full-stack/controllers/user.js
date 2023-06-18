const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const rootDir = require('../util/path');
const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

require('dotenv').config();

function generateAccessToken(id, name) {
    return jwt.sign( { userId: id, name: name } , process.env.TOKEN_SECRET);
}

exports.getSignUpPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'signup.html'));
}

exports.getLoginPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'login.html'));
}

exports.postSignUpData = async (req, res, next) => {
    const { name, email, password } = req.body;
    const saltrounds = 10;
    try {
        // check if the user exists?
        const userExists = await User.findOne({ email: email})
        if(userExists) { return res.status(403).json({ error: 'Email is already taken' } ) }
        //  create the password hash and Create the NEW user.
        const hash = await bcrypt.hash(password, saltrounds)
        const userCreated = await User.create( { name: name, email: email, password: hash } )
        if(userCreated) {
            console.log('@Message: new user signed in.')
            res.status(200).send({ userCreated: true })
        }

    } catch(e) {
        console.log(e.message);
    }
}

exports.postLoginData = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // check for user exists or not!
        const userExists = await User.findOne( { email: email } )
        if(!userExists) { return res.status(404).json( { error: 'User not found' } ) }
        // check password hash
        const passwordsMatch = await bcrypt.compare(password, userExists.password)
        if(!passwordsMatch) { 
            return res.status(403).json( { error: 'Password Mismatch' } )
        } else {
            const id = userExists._id.toString();
            const name = userExists.name;
            res.status(200).json({ 
                message: "User login Successful", 
                success: true, 
                token: generateAccessToken(id, name)
            })
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.getDailyExpenses = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'expenses.html'))
}

exports.getExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find({userId: req.user._id}).select('amount description category')
        if(!expenses) { return res.status(404).json({ message: 'Expenses not found ' } )}
        res.status(200).json(expenses)
    } catch(e) {
        console.log(e.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.postExpenses = async (req, res, next) => {
    
    const { id, amount, description, category } = req.body;
    const token = req.header('Authorization');

    const userDetails = jwt.verify(token, process.env.TOKEN_SECRET);
    if(!userDetails) { return res.status(403).send({ message: 'Operation not allowed' }) }

    const user = await User.findById(userDetails.userId)
    let totalAmount = user.totalAmount;

    try {
        if(id) {
            console.log('@Message: ------- editing a expense -------');
            const currExpense = await Expense.findById(id)

            user.totalAmount -= currExpense.amount
            currExpense.amount = amount
            user.totalAmount += currExpense.amount

            currExpense.description = description
            currExpense.category = category
            currExpense.save();
            console.log('@Message: expense udpated.')
            await user.save();
            console.log(`@Message: totalAmount updated for ${user.name}`);
            res.redirect('/user/expenses');

        } else {
            console.log('@Message: ------- adding a new expense --------')
            
            const updatedAmount = totalAmount + Number(amount);
            // create the expense
            await Expense.create( { amount: amount, description: description, category: category, userId: user._id })
            console.log(`@Message: expense created for ${user.name}`)
            // update the totalamount
            user.totalAmount = updatedAmount;
            await user.save();
    
            console.log(`@Message: totalAmount updated for ${user.name}`);
            res.redirect('/user/expenses');
        }
        
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}
   

exports.postDeleteExpense = async (req, res, next) => {
    const expenseId = req.body.id;
    try {
        const token = req.header('Authorization');
        const userDetails = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(userDetails.userId)
        const currExpense = await Expense.findById(expenseId)
        
        user.totalAmount -= currExpense.amount;
        // user.save();
        console.log(`@Message: totalAmount updated for ${user.name}`);
        await Expense.deleteOne(currExpense._id)
        console.log(`@Message: expenese deleted for ${currExpense._id}`);
        res.redirect('/user/daily-expenses');

    } catch(e) {
        console.log(e.message);
        res.status(401).json( { error: "Operation Not Allowed" });
    }
}


