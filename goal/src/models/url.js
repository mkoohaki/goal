import mongoose from 'mongoose'

//Create the url schema
const urlSchema = new mongoose.Schema(
    {
        title: String,
        embed: String,
        url: String,
        thumbnail: String,
        date: String,//"2020-11-03T10:00:00+0000"
        side1: {
            name: String,
            url: String
        },
        side2: {
            name: String,
            url: String
        },
        competition: {
            name: String,
            id: Number,
            url: String
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
        collection: 'URL',
    }
);

//Create, instantiate and export model with schema
const URL = mongoose.model("URL", urlSchema);
export default URL;
