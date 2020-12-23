import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import Google from '../models/google';
import User from '../models/user';

const router = Router();
module.exports = router;

//App middleware
/*GWT for login*/
router.get('/', (req, res) => {
    res.render('index', { title: 'Login' });
});

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
        res.redirect('/');
};

/*POST for login*/
//Try to login with passport  - It uses authenticat checking to avoid getting/display page withought logging in (just the home page not others...) */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureMessage: 'Invalid Login'
}));

/*GET for Logout*/
router.get('/logout', function (req, res) {

    req.session.destroy();
    res.redirect('/');
});

/*GET for Sign up*/
router.get('/signup', (req, res) => {

    res.render('signup', { title: 'Sign up' });
});


/*POST for Sign up*/
router.post('/signup', (req, res) => {

    //I put require in the form then these conditions do not action
    if (req.body.username && req.body.password && req.body.repassword &&
        req.body.email && req.body.password == req.body.repassword) {
        //Insert user
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            var registerUser = new User();
            registerUser.username = req.body.username;
            registerUser.password = hash;
            registerUser.email = req.body.email;
            if(req.body.username == "admin") {
                registerUser.isAdmin = true;
            }

            //Check if user already exists
            User.find({ username: registerUser.username }, function (err, username) {
                if (err) console.log(err);
                if (!username.length) {
                    User.find({ email: registerUser.email }, function (err, email) {
                        if (err) console.log(err);
                        if (!email.length) {
                            Google.find({ email: req.body.email }, function (err, user) {
                                if (err) console.log(err);
                                if (!user.length) {
                                    const newUser = new User(registerUser);
        
                                    newUser.save(function (err) {
                                        res.render('signup', { success_message: 'You signe up successfully' });
                                    });
                                } else {
                                res.render('signup', { message: 'You already signed up with Google account' });
                                }
                            });
                        } else { 
                            res.render('signup', { message: 'Email already exists' });
                        }
                    });
                } else {
                    res.render('signup', { message: 'Username already exists' });
                }
            });
        });
    } else if (req.body.password != req.body.repassword) {
        res.render('signup', { message: 'Password and repassword are not match' });
    } else { //never get this because of the form requirements
        res.render('signup', { message: 'All fields must be filled out' });
    }
});

/*Get for login with google*/
//Try to login with passport(google)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }), function (req, res) {
});

router.get('/google/callback', passport.authenticate('google', {

    successRedirect: '/home',
    failureRedirect: '/',
    failureMessage: 'Invalid Login'
}));

/*GET for Home*/
router.get('/home', isAuthenticated, (req, res) => {

    res.render('home', { user: req.user, title: 'Home' });
});

export default router;
 
