
const Event = require("../Models/event.js");

async function handleCreateNewEvent(req, res) {
  try {
    console.log("=== Event Creation Request ===");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const {
      title,
      location,
      description,
      startDate,
      endDate,
      bookingStartDate,
      bookingEndDate,
    } = req.body;

    // Validate required fields
    if (!title || !location || !startDate || !endDate || !bookingStartDate || !bookingEndDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        required: ["title", "location", "startDate", "endDate", "bookingStartDate", "bookingEndDate"],
        received: { title, location, startDate, endDate, bookingStartDate, bookingEndDate }
      });
    }

    const image = req.file ? req.file.filename : "";

    // Log the data being sent to database
    const eventData = {
      title,
      location,
      description,
      startDate,
      endDate,
      image,
      bookingStartDate,
      bookingEndDate,
    };

    console.log("Data to be saved:", eventData);

    const newEvent = await Event.create(eventData);

    console.log("✅ Event created successfully:", newEvent);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      eventId: newEvent._id,
      event: newEvent,
    });
  } catch (error) {
    console.error("❌ Error creating event:", error);
    
    // Send more detailed error information
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid data type for one or more fields",
        error: error.message
      });
    }

    res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
}

async function handleGetAllEvents(req, res) {
  try {
    console.log("=== Fetching All Events ===");
    
    const events = await Event.find({}).sort({ createdAt: -1 });
    
    console.log(`✅ Found ${events.length} events`);
    
    res.status(200).json({
      success: true,
      events: events,
      count: events.length
    });
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
}

async function handleGetEventById(req, res) {
  try {
    console.log("=== Fetching Event by ID ===");
    console.log("Event ID:", req.params.id);
    
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
    
    console.log("✅ Event found:", event.title);
    
    res.status(200).json({
      success: true,
      event: event
    });
  } catch (error) {
    console.error("❌ Error fetching event by ID:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format"
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
}

module.exports = {
  handleCreateNewEvent,
  handleGetAllEvents,
  handleGetEventById
};

