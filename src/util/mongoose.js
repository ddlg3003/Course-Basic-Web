module.exports = {
    multipleMongooseToObject: function(mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        if (mongoose) 
            return mongoose.toObject();
        else 
            return mongoose;
    }
}