const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)