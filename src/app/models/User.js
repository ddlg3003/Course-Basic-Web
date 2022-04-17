const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Khởi tạo Schema
const User = new Schema(
    {
        username: { type: String },
        email: { type: String },
        password: { type: String },
        // createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

// export để dùng cho controller tương tác
module.exports = mongoose.model('User', User);
