
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

async function handleUpdateEvent(req, res) {
  try {
    console.log("=== Updating Event ===");
    const { id } = req.params;
    
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
        message: "Missing required fields"
      });
    }

    const updateData = {
      title,
      location,
      description,
      startDate,
      endDate,
      bookingStartDate,
      bookingEndDate,
    };

    // Only update image if a new one is provided
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    console.log("✅ Event updated successfully:", updatedEvent);

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error("❌ Error updating event:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}

async function handleDeleteEvents(req, res) {
  try {
    console.log("=== Deleting Events ===");
    const { eventIds } = req.body;

    if (!eventIds || !Array.isArray(eventIds) || eventIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No event IDs provided"
      });
    }

    console.log("Event IDs to delete:", eventIds);

    const result = await Event.deleteMany({ _id: { $in: eventIds } });

    console.log(`✅ Deleted ${result.deletedCount} events`);

    res.status(200).json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} event(s)`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("❌ Error deleting events:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}

async function handleGetEventStats(req, res) {
  try {
    console.log("=== Fetching Event Statistics ===");
    
    const now = new Date();
    
    // Total events
    const totalEvents = await Event.countDocuments();
    
    // Upcoming events (start date in future)
    const upcomingEvents = await Event.countDocuments({
      startDate: { $gt: now }
    });
    
    // Current/ongoing events (start date <= now AND end date >= now)
    const currentEvents = await Event.countDocuments({
      startDate: { $lte: now },
      endDate: { $gte: now }
    });
    
    // Completed events (end date in past)
    const completedEvents = await Event.countDocuments({
      endDate: { $lt: now }
    });
    
    console.log("✅ Stats:", { totalEvents, upcomingEvents, currentEvents, completedEvents });
    
    res.status(200).json({
      success: true,
      stats: {
        total: totalEvents,
        upcoming: upcomingEvents,
        current: currentEvents,
        completed: completedEvents
      }
    });
  } catch (error) {
    console.error("❌ Error fetching event stats:", error);
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
  handleGetEventById,
  handleUpdateEvent,
  handleDeleteEvents,
  handleGetEventStats
};

