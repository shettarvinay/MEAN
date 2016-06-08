// grab the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var blog = new Schema({
  name: String,
  description: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Blog = mongoose.model('Blog', blog);

// make this available to our users in our Node applications
module.exports = Blog;