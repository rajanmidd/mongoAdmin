"use strict";
const login=require("../models/login");

// Display list of all Authors
exports.index = function(req, res) {
    res.render('pages/login', { flash: { type: 'alert-danger', messages: req.flash('error') }});
};

exports.checkLogin=function(req,res){
    console.log(req.body);
  // validate the input
    //req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email enter a valid email').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    // check the validation object for errors
    var errors = req.validationErrors();
    console.log(errors);  
    if (errors)
    {
        req.flash('error', errors);
        res.redirect("/");
    }
    else
    {
        login.checkLogin(req.body.email,req.body.password);
        console.log("success");
    }
};