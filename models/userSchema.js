import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema ( {
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,

    },

    password: {
        type: String,
        required: true,
    }

}, {timestamps: true})


// first argument is the name of the model and checks for it inside the database, singular of collection name
export const User = mongoose.model("User", userSchema)


