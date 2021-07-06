import mongoose from 'mongoose';

const User = mongoose.model('User', new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
}, {timestamps: true}))

module.exports.User = User;