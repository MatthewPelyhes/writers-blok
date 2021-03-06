const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
    maxLength: 300
  },
  title: {
    type: String,
    required: true,
    maxLength: 30
  },
  author: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }

},
{
  timestamps: true
 }
);

module.exports = mongoose.model('Prompt', PromptSchema)