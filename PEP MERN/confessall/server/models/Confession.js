const mongoose = require('mongoose');

const ConfessionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    secretCode: {
        type: String, // In production, this should be hashed. For this project, we'll store as plain/hashed based on complexity. Let's hash it.
        required: true,
    },
    reactions: {
        like: { type: Number, default: 0 },
        love: { type: Number, default: 0 },
        laugh: { type: Number, default: 0 },
    },
    userId: {
        type: String, // Google Sub ID
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Confession', ConfessionSchema);
