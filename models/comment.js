const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: new Date() },
});

CommentSchema.virtual('timestamp_formatted').get(function () {
  return this.timestamp.toLocaleDateString();
})

module.exports = mongoose.model('Comment', CommentSchema);