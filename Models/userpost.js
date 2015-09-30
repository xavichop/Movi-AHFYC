/**
 * Created by MaríaElena on 28/9/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    picture: String,
    detail: String,
    location: {latitude: Number,
        longitude: Number},
    time: Date,
    username: String,
    category: String
});

module.exports = mongoose.model('UserPost', postSchema);