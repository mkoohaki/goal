import { Router } from 'express';
import Play from '../models/play';
import URL from '../models/url';
import User from '../models/user';
import Google from '../models/google';
import bcrypt from 'bcryptjs';

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
        res.redirect('/');
};

const router = Router();

// GET function - API for public using ('http://localhost:3001/video/api') if user logged in before
router.get('/api', isAuthenticated, async (req, res) => {

    const play = await Play.find({});
    return res.send(play);
});

// GET function - API for public using ('http://localhost:3001/video/api/username/password') with using username and password for indivual users
router.get('/api/:username/:password', async (req, res, next) => {

    const username = req.params.username.trim().toLowerCase();
    const password = req.params.password;

    User.findOne({username: username}, async function(err, user) {

        if (err) {
            res.redirect('error');
        }
        if (user) {        
            if (!bcrypt.compareSync(password, user.password)) {
                res.redirect('/');
            }
            const play = await Play.find({});
            return res.send(play);
        }
        next()
    });
});

// GET function - API for public using ('http://localhost:3001/video/api/username/password') with using username for Google users
router.get('/api/:username', async (req, res, next) => {

    const username = req.params.username.trim().toLowerCase();

    Google.findOne({username: username}, async function(err, user) {

        if (err) {
            res.redirect('error');
        }
        if (user) {        
            const play = await Play.find({});
            return res.send(play);
        }
        next()
    });
});

// GET function for page video
router.get('/', isAuthenticated, async (req, res) => {

    const play = await Play.find({});
    res.render('video', { user: req.user, title: 'Videos', plays: play });
});

// POST function for API
router.post('/find', isAuthenticated, async (req, res) => {

    Play.findOne({date: req.body.date, team1: req.body.team1, team2: req.body.team2}, function(err, match) {
        if (err) console.log(err);
        if(!match) {
            Play.findOne({date: req.body.date, team1: req.body.team2, team2: req.body.team1}, function(err, match) {
                if (err) console.log(err);
                if(!match) {

                    URL.find({ date: req.body.date, 'side1.name': req.body.team1, 'side2.name': req.body.team2 }, function (err, url) {
                        if(err) {
                            console.log(err);
                        }
                        if(url.length) {

                            var vid = [];
                            var object = {};
                            var i = 0;
                            url[0].videos.forEach(function (video) {
                                object[i] = {"title": video.title, "embed": video.embed};
                                vid.push(object[i]);
                                i++;
                            });
                            var finalObject = {...req.body, "videos":vid, "title": url[0].title, "league": url[0].competition["name"]};
                            var play = new Play(finalObject);

                            play.save(function (err) {
                                if (err) console.log(err);
                
                                res.redirect('/video');
                            });
                        } else {
                            URL.find({ date: req.body.date, 'side1.name': req.body.team2, 'side2.name': req.body.team1 }, function (err, url) {
                                if(err) {
                                    console.log(err);
                                }
                                if(url.length) {
        
                                    var vid = [];
                                    var object = {};
                                    var i = 0;
                                    url[0].videos.forEach(function (video) {
                                        object[i] = {"title": video.title, "embed": video.embed};
                                        vid.push(object[i]);
                                        i++;
                                    });
                                    var finalObject = {...req.body, "videos":vid, "title": url[0].title, "league": url[0].competition["name"]};
                                    var play = new Play(finalObject);
        
                                    play.save(function (err) {
                                        if (err) console.log(err);
                        
                                        res.redirect('/video');
                                    });
                                } else {
                                    res.redirect('/video');
                                }
                            });
                        }
                    });
                } else {
                    res.redirect('/video');
                }
            });
        } else {
            res.redirect('/video');
        }
    });
});

export default router;
