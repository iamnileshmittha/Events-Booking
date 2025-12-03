const express = require("express");
const { handleCreateTickets, handleGetTicketsByEventId} = require("../Controllers/ticketype.js");


const router = express.Router();


// This for APi Products
router.route("/")
// .get(handleGetAllProducts)
.post(handleCreateTickets)

// Get tickets for a given eventId
router.get("/event/:eventId", handleGetTicketsByEventId)



module.exports = router;
