const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  description: String,
  file: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
