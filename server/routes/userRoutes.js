const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../model/userSchema');


//Signup Route
router.route('/signup').post( async (req, res)=>{
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;


        if(!name || !email || !password){
            return res.status(422).json({message: 'Fields are Empty'});
        }

        if(password.length < 6){
            return res.status(422).json({message: 'Password must be greater 6 characters.'});
        }

        const userExist = await User.findOne({email: email});

        if(userExist){
            return res.status(422).json({message: 'User already Exist.'});
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name : name,
            email : email,
            passwordHash : passwordHash
        })

        const savedUser = await newUser.save();
        console.log(savedUser);
        return res.status(200).json({message: 'registered successfully'}); 

    } catch (err) {
        console.error(err);
    }
});


//Login Route----------------------------------------------------------------------------------------

router.route('/login').post( async (req, res)=>{
    try {

        const email = req.body.email;
        const password = req.body.password;  
        
        // console.log(email, password);
        
        if(!email || !password){
            return res.status(422).json({message: 'Fields are Empty.'});
        }

        const userExist = await User.findOne({email: email});

        if(!userExist){
            return res.status(422).json({message: 'User dosen\'t exist ' });
        }

        const passwordCorrect = await bcrypt.compare(password, userExist.passwordHash);

        if(!passwordCorrect){
            return res.status(422).json({message: 'Invalid Credentials'});
        }

        const token = jwt.sign({
            user: userExist._id
        }, process.env.JWT_SECRET);

        return res.status(200).json({"token": token});


    } catch (err) {
        console.error(err);
    }
})



module.exports = router;