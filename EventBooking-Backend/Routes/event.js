const express = require("express");
const path = require("path");
const multer = require("multer");
const { handleCreateNewEvent, handleGetAllEvents, handleGetEventById } = require("../Controllers/event.js");

const router = express.Router();

// 📁 Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // make sure this folder exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage });

// GET all events
router.get("/", handleGetAllEvents);

// GET single event by ID
router.get("/:id", handleGetEventById);

// POST create new event
router.post("/", upload.single("image"), handleCreateNewEvent);

module.exports = router;


