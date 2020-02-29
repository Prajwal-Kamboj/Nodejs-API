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