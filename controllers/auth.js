const User = require('../models/Users');
const ErrorResponse = require ('../utils/errorResponse');

// desc - Register User
//@route Get /api/v1/auth/register
//@access   public

exports.register = async (req,res,next) =>{
    try {
        const {name, email, password, role} = req.body;
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        // create Token
        const token = user.getSignedJwtToken();

        res.status(201).json({
            success : true,
            token
            
        });
        
    } catch (err) {
        next(err);
    }
};

// desc - login User
//@route Get /api/v1/auth/login
//@access   public

exports.login = async (req,res,next) =>{
    try {
        const { email, password} = req.body;
       
        // Validate Email
        if(!email || !password){
            return next(new ErrorResponse('Email and Password required', 400));

        }
        // Check for user
        const user = await  User.findOne ({email}).select('+password');

        if(!user){
            return next(new ErrorResponse('Invalid credentials',401));
        }

        // Check if password matches 
        const match = await user.matchPassword(password);

        if(!match) {
            return next(new ErrorResponse('Invalid credentials',401));
        }

         // create Token
         const token = user.getSignedJwtToken();

         res.status(200).json({success:true, token});
        
    } catch (err) {
        next(new ErrorResponse('Invalid credentialsss',401));
    }
};