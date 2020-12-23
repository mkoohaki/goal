import { Router } from 'express';
import Game from '../models/game';
import request from "request";
import User from '../models/user';
import Google from '../models/google';
import bcrypt from 'bcryptjs';

const router = Router();
const mainURL = `http://localhost:${process.env.PORT}/history/api/`;

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
        res.redirect('/');
};

// GET function - API for public using  ('http://localhost:3001/history/api') if user logged in before
router.get('/api', isAuthenticated, async (req, res) => {
    const matches = await Game.find({});
    return res.send(matches);
});

// GET function - API for public using  ('http://localhost:3001/history/api/username/password') with using username and password for indivual users
router.get('/api/:username/:password', async (req, res, next) => {

    const username = req.params.username.trim().toLowerCase();
    const password = req.params.password;

    User.findOne({username: username}, async function(err, user) {

        if (err) {
            console.log(err);
        }
        if (user) {        
            if (!bcrypt.compareSync(password, user.password)) {
                res.redirect('/');
            }
            const matches = await Game.find({});
            return res.send(matches);
        }
        next()
    });
});

// GET function - API for public using  ('http://localhost:3001/history/api/username') with using username for Google users
router.get('/api/:username', async (req, res, next) => {

    const username = req.params.username.trim().toLowerCase();
    
    Google.findOne({username: username}, async function(err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            const matches = await Game.find({});
            return res.send(matches);
        }
        next()
    });
});

// GET function - API for public using  ('http://localhost:3001/history/api/?') if user logged in before
router.get('/api/:country', isAuthenticated, async (req, res) => {

    const country = req.params.country.trim().toLowerCase();
    var league = null;

    if (country == 'england' || country == 'eng' || country == 'english' || country == 'premier-league') league = "english-premier-league";
    else if (country == 'france' || country == 'fr' || country == 'french' || country == 'ligue-1') league = "french-ligue-1";
    else if (country == 'germany' || country == 'german' || country == 'dutchland' || country == 'bundesliga') league = "german-bundesliga";
    else if (country == 'italy' || country == 'italian' || country == 'serie-a') league = "italian-serie-a";
    else if (country == 'spain' || country == 'sp' || country == 'spanish' || country == 'la-liga') league = "spanish-la-liga";

    const matches = await Game.find({ league: league });
    return res.send(matches);
});

// GET function - API for public using  ('http://localhost:3001/history/api/?/username/password') with using username and password for indivual users
router.get('/api/:country/:username/:password', async (req, res, next) => {

    const country = req.params.country.trim().toLowerCase();
    const username = req.params.username.trim().toLowerCase();
    const password = req.params.password;
    var league = null;

    if (country == 'england' || country == 'eng' || country == 'english' || country == 'premier-league') league = "english-premier-league";
    else if (country == 'france' || country == 'fr' || country == 'french' || country == 'ligue-1') league = "french-ligue-1";
    else if (country == 'germany' || country == 'german' || country == 'dutchland' || country == 'bundesliga') league = "german-bundesliga";
    else if (country == 'italy' || country == 'italian' || country == 'serie-a') league = "italian-serie-a";
    else if (country == 'spain' || country == 'sp' || country == 'spanish' || country == 'la-liga') league = "spanish-la-liga";

    User.findOne({username: username}, async function(err, user) {

        if (err) {
            console.log(err);
        }
        if (user) {
            if (!bcrypt.compareSync(password, user.password)) {
                res.redirect('/');
            }
            const matches = await Game.find({ league: league });
            return res.send(matches);
        }
        next()
    });
});

// GET function - API for public using  ('http://localhost:3001/history/api/?/username') with using username for Google users
router.get('/api/:country/:username', async (req, res, next) => {

    const country = req.params.country.trim().toLowerCase();
    const username = req.params.username.trim().toLowerCase();
    var league = null;

    if (country == 'england' || country == 'eng' || country == 'english' || country == 'premier-league') league = "english-premier-league";
    else if (country == 'france' || country == 'fr' || country == 'french' || country == 'ligue-1') league = "french-ligue-1";
    else if (country == 'germany' || country == 'german' || country == 'dutchland' || country == 'bundesliga') league = "german-bundesliga";
    else if (country == 'italy' || country == 'italian' || country == 'serie-a') league = "italian-serie-a";
    else if (country == 'spain' || country == 'sp' || country == 'spanish' || country == 'la-liga') league = "spanish-la-liga";

    Google.findOne({username: username}, async function(err, user) {

        if (err) {
            console.log(err);
        }
        if (user) {
            const matches = await Game.find({ league: league });
            return res.send(matches);
        }
        next()
    });
});

// GET function - API for public using  ('http://localhost:3001/history/api/?/?') if user logged in before
router.get('/api/:country/:period', isAuthenticated, async (req, res) => {

    const country = req.params.country.trim().toLowerCase();
    const period = req.params.period.trim();

    var league = null;
    var season = null;

    if (country == 'england' || country == 'eng' || country == 'english' || country == 'premier-league') league = "english-premier-league";
    else if (country == 'france' || country == 'fr' || country == 'french' || country == 'ligue-1') league = "french-ligue-1";
    else if (country == 'germany' || country == 'german' || country == 'dutchland' || country == 'bundesliga') league = "german-bundesliga";
    else if (country == 'italy' || country == 'italian' || country == 'serie-a') league = "italian-serie-a";
    else if (country == 'spain' || country == 'sp' || country == 'spanish' || country == 'la-liga') league = "spanish-la-liga";

    if (period == '9' || period == '09' || period == '2009' || period == '2009-10' || period == '2009-2010') season = "2009-10";
    else if (period == '10' || period == '2010' || period == '2010-11' || period == '2010-2011') season = "2010-11";
    else if (period == '11' || period == '2011' || period == '2011-12' || period == '2011-2012') season = "2011-12";
    else if (period == '12' || period == '2012' || period == '2012-13' || period == '2012-2013') season = "2012-13";
    else if (period == '13' || period == '2013' || period == '2013-14' || period == '2013-2014') season = "2013-14";
    else if (period == '14' || period == '2014' || period == '2014-15' || period == '2014-2015') season = "2014-15";
    else if (period == '15' || period == '2015' || period == '2015-16' || period == '2015-2016') season = "2015-16";
    else if (period == '16' || period == '2016' || period == '2016-17' || period == '2016-2017') season = "2016-17";
    else if (period == '17' || period == '2017' || period == '2017-18' || period == '2017-2018') season = "2017-18";
    else if (period == '18' || period == '2018' || period == '2018-19' || period == '2018-2019') season = "2018-19";

    const matches = await Game.find({ league: league, season: season });
    return res.send(matches);
});

// GET function - API for public using  ('http://localhost:3001/history/api/?/?/username/password') with using username and password for indivual users
router.get('/api/:country/:period/:username/:password', async (req, res, next) => {

    const country = req.params.country.trim().toLowerCase();
    const period = req.params.period.trim();
    const username = req.params.username.trim().toLowerCase();
    const password = req.params.password;

    var league = null;
    var season = null;

    if (country == 'england' || country == 'eng' || country == 'english' || country == 'premier-league') league = "english-premier-league";
    else if (country == 'france' || country == 'fr' || country == 'french' || country == 'ligue-1') league = "french-ligue-1";
    else if (country == 'germany' || country == 'german' || country == 'dutchland' || country == 'bundesliga') league = "german-bundesliga";
    else if (country == 'italy' || country == 'italian' || country == 'serie-a') league = "italian-serie-a";
    else if (country == 'spain' || country == 'sp' || country == 'spanish' || country == 'la-liga') league = "spanish-la-liga";

    if (period == '9' || period == '09' || period == '2009' || period == '2009-10' || period == '2009-2010') season = "2009-10";
    else if (period == '10' || period == '2010' || period == '2010-11' || period == '2010-2011') season = "2010-11";
    else if (period == '11' || period == '2011' || period == '2011-12' || period == '2011-2012') season = "2011-12";
    else if (period == '12' || period == '2012' || period == '2012-13' || period == '2012-2013') season = "2012-13";
    else if (period == '13' || period == '2013' || period == '2013-14' || period == '2013-2014') season = "2013-14";
    else if (period == '14' || period == '2014' || period == '2014-15' || period == '2014-2015') season = "2014-15";
    else if (period == '15' || period == '2015' || period == '2015-16' || period == '2015-2016') season = "2015-16";
    else if (period == '16' || period == '2016' || period == '2016-17' || period == '2016-2017') season = "2016-17";
    else if (period == '17' || period == '2017' || period == '2017-18' || period == '2017-2018') season = "2017-18";
    else if (period == '18' || period == '2018' || period == '2018-19' || period == '2018-2019') season = "2018-19";

    User.findOne({username: username}, async function(err, user) {

        if (err) {
            console.log(err);
        }
        if (user) {
            if (!bcrypt.compareSync(password, user.password)) {
                res.redirect('/');
            }
            const matches = await Game.find({ league: league, season: season });
            return res.send(matches);
        }
        next()
    });
});


// GET function - API for public using  ('http://localhost:3001/history/api/?/?/username') with using username for Google users
router.get('/api/:country/:period/:username', async (req, res, next) => {

    const country = req.params.country.trim().toLowerCase();
    const period = req.params.period.trim();
    const username = req.params.username.trim().toLowerCase();

    var league = null;
    var season = null;

    if (country == 'england' || country == 'eng' || country == 'english' || country == 'premier-league') league = "english-premier-league";
    else if (country == 'france' || country == 'fr' || country == 'french' || country == 'ligue-1') league = "french-ligue-1";
    else if (country == 'germany' || country == 'german' || country == 'dutchland' || country == 'bundesliga') league = "german-bundesliga";
    else if (country == 'italy' || country == 'italian' || country == 'serie-a') league = "italian-serie-a";
    else if (country == 'spain' || country == 'sp' || country == 'spanish' || country == 'la-liga') league = "spanish-la-liga";

    if (period == '9' || period == '09' || period == '2009' || period == '2009-10' || period == '2009-2010') season = "2009-10";
    else if (period == '10' || period == '2010' || period == '2010-11' || period == '2010-2011') season = "2010-11";
    else if (period == '11' || period == '2011' || period == '2011-12' || period == '2011-2012') season = "2011-12";
    else if (period == '12' || period == '2012' || period == '2012-13' || period == '2012-2013') season = "2012-13";
    else if (period == '13' || period == '2013' || period == '2013-14' || period == '2013-2014') season = "2013-14";
    else if (period == '14' || period == '2014' || period == '2014-15' || period == '2014-2015') season = "2014-15";
    else if (period == '15' || period == '2015' || period == '2015-16' || period == '2015-2016') season = "2015-16";
    else if (period == '16' || period == '2016' || period == '2016-17' || period == '2016-2017') season = "2016-17";
    else if (period == '17' || period == '2017' || period == '2017-18' || period == '2017-2018') season = "2017-18";
    else if (period == '18' || period == '2018' || period == '2018-19' || period == '2018-2019') season = "2018-19";

    Google.findOne({username: username}, async function(err, user) {

        if (err) {
            console.log(err);
        }
        if (user) {
            const matches = await Game.find({ league: league, season: season });
            return res.send(matches);
        }
        next()
    });
});

// GET function for page history
router.get('/', isAuthenticated, (req, res) => {
    res.render('history', { user: req.user, title: 'History'});
});

// GET function for page history (Using from API instead of database)
router.post('/', isAuthenticated, (req, res) => {

    const league = req.body.leagues;
    const season = req.body.seasons;
    var ur = null;
    var allSeasons = false;
    if(league != 'League') {

        if (league == 'Germany Bundesliga') 
            ur = mainURL + 'germany/';
        else if (league == 'England Premier League')
            ur = mainURL + 'england/';
        else if (league == 'France Ligue 1')
            ur = mainURL + 'france/';
        else if (league == 'Spain La Liga')
            ur = mainURL + 'spain/';
        else if (league == 'Italy Serie A')
            ur = mainURL + 'italy/';
        
        if(season != 'Season')
            ur += season + '/';

        // I know this is hardcode, but I wanted to show how others use API, whereas I could use find method to call the information
        // from the database, in real world the API users should use username and password at the endpoint right? 
        // The problem was hashed password!
        // I could use request.get({ ur, {
        // auth: {
        //     user: 'username',
        //     pass: 'password',
        //     sendImmediately: false
        // },
        // json: true
        // }, function(error, response, body) {
        //     console.log( 'Found: ', body.response.numFound );
        // });
        request({
            url: ur + req.user.username +'/6465', 
        }, function(error, response, body) {

            if(error) {
                console.log('Error1: ', error);
            }
            var obj = [];
            var n = 0;
            try {
                var lines = body.substring(body.indexOf('[')+1, body.lastIndexOf(']'));
                lines = lines.split(',{');
                var newLine = null;
                lines.forEach((line) => {
                    var newLine1 = null

                    if(n == 0) {            
                        newLine1 = line;
                    } else {
                        newLine1 = '{' + line;
                    }
                    obj.push(JSON.parse(newLine1));
                    n++;
                });
            } catch (error) {
                console.log('Error2: ', error);
            }
            res.render('history', { user: req.user, objects: obj, league: league, season: season , title: 'History'} );
        });

    } else {
        res.render('history', { user: req.user, title: 'History' });
    }
});


export default router;
