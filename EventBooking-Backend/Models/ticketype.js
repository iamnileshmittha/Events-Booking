const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketType: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  bookingEndDate: { type: Date, required: true },
  availability: { type: String, enum: ["unlimited", "limited"], required: true },
  maxTicketsPerOrder: { type: Number, required: true },
  seatsCount: { type: Number, default: null },
  remainingSeats: { type: Number, default: null },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
});

module.exports = mongoose.model("Ticket", ticketSchema);