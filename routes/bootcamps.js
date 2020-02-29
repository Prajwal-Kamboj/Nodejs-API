const express = require('express');
const {getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp}
= require('../controllers/bootcamps');

// Include other resource routers
const courseRouter = require('./courses');



const router = express.Router();

const {protect} = require('../middleware/auth'); 




// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);


router
.route('/')
.get(getBootcamps)
.post(protect,createBootcamp);

router
.route('/:id')
.get(getBootcamp)
.put(protect,updateBootcamp)
.delete(protect,deleteBootcamp);


module.exports = router;