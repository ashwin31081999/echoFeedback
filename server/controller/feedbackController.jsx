const Feedback = require("../models/feedbackModel.jsx");

exports.addFeedback = async (req, res) => {
  try {
    const { name, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const feedback = new Feedback({
      name,
      description,
      file: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', id: feedback._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save feedback', details: err.message });
  }
};
