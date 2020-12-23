import { Router } from 'express';
import Game from '../models/game';
import fs, { readFile } from 'fs';
import multer from 'multer';

const router = Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
        res.redirect('/');
};

// GET function for page Update History
router.get('/', isAuthenticated, async (req, res) => {

    res.render('update', { user: req.user, title: 'Update History' });
});

//Creating the file name and destination directory when called
const storage = multer.diskStorage({

    destination: function (req, file, callback) {

        const name = file.originalname;
        const directoryName =  name.substr(0,name.indexOf('-'))

        const directory = './public/storage/' + directoryName + '/';

        if (!fs.existsSync(directory)) {

            fs.mkdir(directory, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("New directory successfully created.")
                }
            });
        }
        callback(null, directory)
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

//Creating uploader
const upload = multer({ storage: storage });

// POST function for updating the history database -Game- for API
router.post('/', upload.single('file'), function (req, res, next) {

    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }

    try {
        var data = fs.readFileSync(file.path, 'utf8');

        const lines = data.split(',{');
        var newLine = null;
        const league = file.originalname.slice(0, file.originalname.length-12)
        const season = file.originalname.substring(file.originalname.length-11, file.originalname.length-4)
        
        lines.forEach((line) => {

            var newLine1 = line.slice(0, line.length-1);
            var newLine2 = '{'+newLine1+',\"league\": \"' + league + '\", \"season\":' + '\"' + season + '\"}';

            newLine = JSON.parse(newLine2);

            const game = new Game(
                newLine,
            );
            game.save();
        });
        res.redirect('/update');

    } catch(e) {
        console.log('Error:', e.stack);
    }
});

export default router;
