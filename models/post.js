const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema ({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  visiblity: { type: String, required: true },
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);