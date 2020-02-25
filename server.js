const express = require('express');
const dotenv = require ('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db')

// load env 
dotenv.config({path : './config/config.env'});

//connect to db
connectDB();

const app = express();
//route files
const bootcamps = require('./routes/bootcamps');

// Body parser
app.use(express.json());




// mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT= process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// handle unhandled rejections
process.on('unhandledRejection',(err, promise) =>{
    console.log(`Error : ${err.message}`);
    //close server and exit process
    server.close(()=> process.exit(1));
})