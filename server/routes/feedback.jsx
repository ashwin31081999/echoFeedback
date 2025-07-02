const express = require("express");
const multer = require("multer");
const { addFeedback } = require("../controller/feedbackController.jsx");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/feedback", upload.single("file"), addFeedback);

module.exports = router;
