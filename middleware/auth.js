const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/Users');
const asyncHandler = require('./async');

// Protect routes
exports.protect = asyncHandler(async (req,res,next)=>{
    let token;

    if(req.headers.authorization &&
         req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
    }

    else if(req.cookies.token){
        token = req.cookies.token;
    }

    if(!token){
        return next(new ErrorResponse('Not logged in'),401);
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);
        next();

        
    } catch (err) {
        return next(new ErrorResponse('Cannot access this route'),401);
    }
});





// Specific roles access

exports.authorize = (...roles)=>{
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`),403);

        }
        next();
    }
}