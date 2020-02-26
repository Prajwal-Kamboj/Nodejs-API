const Course = require('../models/Course');

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
        res.status(400).json({success:false});
    }
}