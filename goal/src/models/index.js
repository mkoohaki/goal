import mongoose from 'mongoose';

import User from './user';
import Game from './game';
import Play from './play';
import URL from './url';


const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
}

const models = { User, Game, Play, URL };

export { connectDb };
export default models;