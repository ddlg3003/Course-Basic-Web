const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Khởi tạo Schema 
const Course = new Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

// export để dùng cho controller tương tác
module.exports = mongoose.model('Course', Course);