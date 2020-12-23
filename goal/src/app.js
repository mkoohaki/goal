import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { connectDb as connect } from './models';
import routes from './routes/index';
import URL from './models/url';
import User from './models/user';
import Google from './models/google';
import historyRoutes from './routes/history';
import videoRoutes from './routes/video';
import updateRoutes from './routes/update';
import request from "request";
import bcrypt from 'bcryptjs';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser'; 

const ur = 'https://www.scorebat.com/video-api/v1/';

var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var path = require('path');

const app = express();
const PORT = process.env.PORT;

//CORS: Cross Origin Resources Sharing
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// app.use(cookieParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
}));

//Init passport auth
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/history', historyRoutes);
app.use('/video', videoRoutes);
app.use('/update', updateRoutes);


//Serialize user
passport.serializeUser(function (user, done) {
    done(null, user.id)
});

//deserialize user try to find username
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) console.log(err);
        if (user) {
            done(err, user);
        } else {
            Google.findById(id, function (err, user) {
                if (err) console.log(err);
                done(err, user);
            })
        }
    });
});

//Local strategy used for logging users
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            //Compare hashed passwords
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false);
            }

            return done(null, user);
        });
    }
));

//Startegy for google accounts - Using Google API for registration
passport.use(new GoogleStrategy({
    clientID: process.env.API_GOOGLE,
    clientSecret: process.env.API_GOOGLE_PASSWORD,
    callbackURL: `http://localhost:${process.env.PORT}/google/callback`
},
    function (accessToken, refreshToken, profile, done) {

        var emailArray = new Array();
        profile.emails.forEach((email) => {
            emailArray.push(email.value);
        })

        var photoArray = new Array();
        profile.photos.forEach((photo) => {
            photoArray.push(photo.value);
        })

        Google.findOne({ $or: [{ oauthID: profile.id }, { email: { $in: emailArray } }] }, function (err, user) {
            if (err) {
                return console.log(err);
            }
            if (!err && user !== null) {
                console.log('---------------------Already user exists in Google---------------------');
                return done(null, user);
            } else {

                User.findOne({ email: { $in: emailArray } }, function (err, user) {
                    if (err) {
                        return console.log(err);
                    }
                    if (!err && user !== null) {
                        console.log('---------------------Already user exists in User---------------------');
                       // return done(err);
                        done(null, false)
                    } else {

                        console.log('---------------------Creating a new user---------------------');

                        const user = new Google({

                            username: profile.name.givenName,
                            oauthID: profile.id,
                            email: emailArray[0],
                        });
                        user.save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                return done(null, user);
                            }
                        });
                    }
                });
            }
        });
    }
));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
     var err = new Error('Not Found');
     err.status = 404;

    res.render('error', { message: err.message, error: err.status, title: 'Error' });
    return;
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err.status
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


connect().then(async() => {

    //Calling function updateURLDatabase
    updateURLDatabase();
    
    app.listen(PORT, () => {
        console.log(`Goal is running on port ${PORT}!`);
    });

}).catch(err => {
    console.error(error.message);
});

// Auto function for updating the video source database -URL- for using in Play databse for API
function updateURLDatabase() {
    console.log('creating default data');
    request({
        url: ur,
    }, function(error, response, body) {

        try {
            const lines = body.split(']');
            var newLine = null;
            var n = 0;

            lines.forEach((line) => {
                if(n == 0) {            
                    var newLine1 = line.slice(6, line.length);
                } else {
                    var newLine1 = line.slice(8, line.length);
                }
                n++;
                var newLine2 = newLine1 + ']\n}';

                newLine = JSON.parse(newLine2);
                
                const url = new URL(
                    newLine,
                );
                URL.find({ title: newLine.title,
                        embed: newLine.embed,
                        date: newLine.date,
                        side1: newLine.side1,
                        side2: newLine.side2 }, function (err, duplicatedLine) {
                    if(err) {
                        console.log(err);
                    }
                    if(!duplicatedLine.length) {
                        url.save();
                    }
                });
            });
            res.send('DONE!');
        } catch (err) {
        }
    });
};
