const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDatabase = require("./config/connectDatabase.jsx");
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const app = express();
connectDatabase();

app.use(express.json());
app.use(cors());

const feedback = require("./routes/feedback.jsx");
app.use("/api", feedback);

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} phase`
  );
});
