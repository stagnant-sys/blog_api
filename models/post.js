const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema ({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  visibility: { type: String, required: true },
}, 
{ 
  timestamps: true,
  toJSON: { virtuals: true }
});

BlogPostSchema.virtual('createdAt_formatted').get(function () {
  return this.createdAt.toLocaleDateString();
})

BlogPostSchema.virtual('updatedAt_formatted').get(function () {
  return this.updatedAt.toLocaleDateString();
})

module.exports = mongoose.model('BlogPost', BlogPostSchema);