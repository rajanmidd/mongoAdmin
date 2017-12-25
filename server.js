'use strict';
const express=require("express"),
app=express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
path=require('path'),
logger=require('morgan'),
flash = require('connect-flash'),
session = require('express-session'),
expressValidator = require('express-validator');

// Require Custom Files
const database=require("./config/database"),
config=require("./config/config"),
routes=require("./app/http/routes");


app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/app/views'));
app.use(expressValidator()); 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(flash());

// Create the database connection 
mongoose.connect(database.connectionString,{auth:{authdb:"admin"}}); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + database.connectionString);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

app.use('/', routes);

app.listen(config.port,function(err){
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Server Running at 10025 server.");
    }
});