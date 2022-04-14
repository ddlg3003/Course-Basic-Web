const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Plugin tao slug
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

// Khởi tạo Schema
const Course = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    videoId: { type: String },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

// export để dùng cho controller tương tác
module.exports = mongoose.model('Course', Course);
