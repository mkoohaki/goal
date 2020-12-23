import mongoose from 'mongoose'

//Create the play schema
const playSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        team1: { //Home Team
            type: String,
            required: true,
            trim: true,
        }, 
        team2: { //Away Team
            type: String,
            required: true,
            trim: true,
        },
        league: { //League of country
            type: String,
            required: true
        },
        videos: [
            {
                title: String,
                embed: String
            },
        ],
    },
    {
        timestamps: true,
        collection: 'Play',
    }
);

//Create, instantiate and export model with schema
const Play = mongoose.model("Play", playSchema);
export default Play;
