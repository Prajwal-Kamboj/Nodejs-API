const User = require('../models/Users');
const ErrorResponse = require ('../utils/errorResponse');

// desc - Register User
//@route Get /api/v1/auth/register
//@access   public

exports.register =  (req,res,next) =>{
   res.status(200).json({
       success: true,

   })
};