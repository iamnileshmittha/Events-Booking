const Ticket = require("../Models/ticketype.js");

async function handleCreateTickets(req, res) {
  try {
    const tickets = req.body.tickets;

    const cleanedTickets = tickets.map(ticket => {
      return {
        ...ticket,
        seatsCount: ticket.seatsCount || null,
        remainingSeats: ticket.remainingSeats || null,
      };
    });

    const result = await Ticket.insertMany(cleanedTickets);
    res.status(201).json({ message: "Tickets created", data: result });
  } catch (error) {
    console.error("❌ Error creating tickets:", error);
    res.status(500).json({ message: "Failed to create tickets" });
  }
}

async function handleGetTicketsByEventId(req, res) {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ success: false, message: "eventId is required" });
    }

    const tickets = await Ticket.find({ eventId }).sort({ ticketPrice: 1 });

    return res.status(200).json({ success: true, tickets, count: tickets.length });
  } catch (error) {
    console.error("❌ Error fetching tickets:", error);

    return res.status(500).json({ success: false, message: "Failed to fetch tickets" });
  }
}

async function handleUpdateOrCreateTickets(req, res) {
  try {
    console.log("=== Updating/Creating Tickets ===");
    const tickets = req.body.tickets;
    const eventId = tickets[0]?.eventId;

    if (!eventId) {
      return res.status(400).json({ success: false, message: "Event ID is required" });
    }

    // Delete all existing tickets for this event
    await Ticket.deleteMany({ eventId });

    // Create new tickets
    const cleanedTickets = tickets.map(ticket => {
      return {
        ticketType: ticket.ticketType,
        ticketPrice: ticket.ticketPrice,
        bookingEndDate: ticket.bookingEndDate,
        availability: ticket.availability,
        maxTicketsPerOrder: ticket.maxTicketsPerOrder,
        seatsCount: ticket.seatsCount || null,
        remainingSeats: ticket.remainingSeats || null,
        eventId: eventId
      };
    });

    const result = await Ticket.insertMany(cleanedTickets);
    
    console.log("✅ Tickets updated successfully");
    
    res.status(200).json({ 
      success: true,
      message: "Tickets updated successfully", 
      data: result 
    });
  } catch (error) {
    console.error("❌ Error updating tickets:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to update tickets",
      error: error.message 
    });
  }
}

module.exports={

    handleCreateTickets,
    handleGetTicketsByEventId,
    handleUpdateOrCreateTickets,
}