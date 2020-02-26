const Course = require('../models/Course');
const ErrorResponse = require ('../utils/errorResponse');


// desc - Get all bootcamps
//@route Get /api/v1/bootcamps
//@access   Public

exports.getCourses = async(req,res,next) =>{
    let query;

    if(req.params.bootcampId){
        query = Course.find({ bootcamp: req.params.bootcampId});
    }else{
        query = Course.find().populate({
            path: 'bootcamp',
            select:' name description'
        });
    }

    try {
        const courses = await query;
        
        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        next(
            new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
        );
    }
}