const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    openid: {
        type: String,
        required: true,
        unique: true
    },
    session_id: {
        type: String
    },
    role: {
        type: Number,
        default: 3
    },
    nickName: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: Number,
        default: 1,
        required: false
    },
    city: {
        type: String,
        trim: true
    },
    province: {
        type: String,
        trim: true
    },
    avatarUrl: {
        type: String
    },
    phone: {
        type: String
    },
    coin: {
        type: Number,
        default: 10
    }
});

module.exports = mongoose.model('Users', UserSchema);
