const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    content: { type: String, required: [true, 'Content is required'] },
    authorName: { type: String, required: [true, 'Author name is required'], trim: true },
    tags: { type: [String], default: [] },
    blogImage: { type: String, trim: true, default: '' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
