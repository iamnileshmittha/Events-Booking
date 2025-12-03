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

module.exports={

    handleCreateTickets,
    handleGetTicketsByEventId,
}