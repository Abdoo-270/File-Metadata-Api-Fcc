var express = require("express");
const multer = require("multer");
const fs = require("fs");

var cors = require("cors");
require("dotenv").config();

var app = express();

// Set up Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// character encoding
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Extract metadata
    const { originalname, mimetype, size } = req.file;

    const metadata = {
      name: originalname,
      type: mimetype,
      size,
    };

    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
