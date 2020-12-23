import mongoose from 'mongoose'

//Create the user schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }, 
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        collection: 'Users',
    }
);

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
        username: login
    });
    if (!user) {
        user = await this.findOne({
            email: login,
        });
    }

    return user;
};

userSchema.pre('save', function(next){
    const user = this;
    if (this.isModified('password')) {
        //encrypt the password string
    }
    next();
});

//Create, instantiate and export model with schema
const User = mongoose.model("User", userSchema);
export default User;
