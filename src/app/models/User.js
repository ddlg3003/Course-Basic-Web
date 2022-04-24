const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Khởi tạo Schema
const User = new Schema(
    {
        avatar: {
            type: String,
            default:
                'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-1/253310370_1569227160102616_8411787301907849989_n.jpg?stp=dst-jpg_p240x240&_nc_cat=106&ccb=1-5&_nc_sid=7206a8&_nc_ohc=ctDZJ3sC8eQAX_Ro9gh&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT-0XZ618lgI_lnNaM8iiVrbMMzhj7fTIfaR5UXDHff5tA&oe=62639132',
        },
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
