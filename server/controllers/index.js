/*File Name:  index.js, Student Names:Runali Patel - 301110236, Muksud Hussain Mahi - 301155894, Devanshi Patel – 301161377 , 
Tanisha Sharma - 301144152, Sabah Hussein - 300882730 Date:14/07/2021 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// creates the User Model instance
let userModel = require('../models/user');
let User = userModel.User;


module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Survey Site', displayName: req.user ? req.user.displayName : '' });
}
//added about us page controller
module.exports.displayAboutUs = (req, res, next) => {
    res.render('aboutus', { title: 'About Survey Site', displayName: req.user ? req.user.displayName : '' });
}


/*Handlers for User Login & Registration*/
module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        res.render('auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // handle server error
        if (err) {
            return next(err);
        }

        // handle user login error
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.login(user, (err) => {
            // handle server error
            if (err) {
                return next(err);
            }

            return res.redirect('survey-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        res.render('auth/register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        // password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New User");
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User ID Already Exists!'
                );
                console.log('Error: User ID Already Exists!')
            }

            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            // no error on registration

            // redirect the user and authenticate them
            return passport.authenticate('local') (req, res, () => {
                res.redirect('survey-list');
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}


