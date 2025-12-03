const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v instanceof Date && !isNaN(v);
      },
      message: 'Start date must be a valid date'
    }
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v instanceof Date && !isNaN(v);
      },
      message: 'End date must be a valid date'
    }
  },
  image: {
    type: String, // you can store image URL or filename
  },
  bookingStartDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v instanceof Date && !isNaN(v);
      },
      message: 'Booking start date must be a valid date'
    }
  },
  bookingEndDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v instanceof Date && !isNaN(v);
      },
      message: 'Booking end date must be a valid date'
    }
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

// Pre-save middleware to ensure dates are properly formatted
eventSchema.pre('save', function(next) {
  // Convert string dates to Date objects if they're strings
  if (typeof this.startDate === 'string') {
    this.startDate = new Date(this.startDate);
  }
  if (typeof this.endDate === 'string') {
    this.endDate = new Date(this.endDate);
  }
  if (typeof this.bookingStartDate === 'string') {
    this.bookingStartDate = new Date(this.bookingStartDate);
  }
  if (typeof this.bookingEndDate === 'string') {
    this.bookingEndDate = new Date(this.bookingEndDate);
  }
  next();
});

module.exports = mongoose.model("Event", eventSchema);
