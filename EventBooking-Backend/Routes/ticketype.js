const express = require("express");
const { handleCreateTickets, handleGetTicketsByEventId, handleUpdateOrCreateTickets} = require("../Controllers/ticketype.js");


const router = express.Router();


// This for APi Products
router.route("/")
.post(handleCreateTickets)

// Get tickets for a given eventId
router.get("/event/:eventId", handleGetTicketsByEventId)

// Update tickets for an event
router.put("/update", handleUpdateOrCreateTickets)



module.exports = router;
