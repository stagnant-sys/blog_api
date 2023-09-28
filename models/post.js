const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema ({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  visibility: { type: String, required: true },
}, { timestamps: true });

BlogPostSchema.virtual('timestamp_formatted').get(function () {
  return this.timestamp.toLocaleDateString();
})

module.exports = mongoose.model('BlogPost', BlogPostSchema);