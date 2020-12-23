import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

//Create the google user schema
const googleSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        oauthID: {
            type: Number,
            required: true,
            unique: true
        }, 
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        }
    },
    {
        timestamps: true,
        collection: 'Google',
    }
);

googleSchema.plugin(passportLocalMongoose);

//Create, instantiate and export model with schema
const Google = mongoose.model("Google", googleSchema);
module.exports = Google;
