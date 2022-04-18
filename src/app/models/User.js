const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Khởi tạo Schema
const User = new Schema(
    {
        username: { type: String, unique: true },
        email: { type: String },
        password: { type: String },
        mycourses: { type: Array, default: [] },
        // createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

// export để dùng cho controller tương tác
module.exports = mongoose.model('User', User);
