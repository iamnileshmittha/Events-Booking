const express = require("express");
const cors = require("cors");

const cookieParser = require('cookie-parser');

const productRouter = require("./Routes/event.js");
const userrouter = require("./Routes/user.js");
const ticketypeRouter = require("./Routes/ticketype.js");
const path = require('path');
const {connectToMongoDB} =require("./config.js");

const app = express();

app.use(cookieParser());

// Mongo DB connection 
connectToMongoDB(process.env.MONGO_URI);

const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://events-booking-liard.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/uploads', express.static('uploads'));

// Test route to verify server is working
app.get("/test", (req, res) => {
  res.json({ message: "Server is running!", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/user/",userrouter);
app.use("/api/event/",productRouter);
app.use("/api/ticketype/",ticketypeRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ 
    success: false,
    message: "Something went wrong!",
    error: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: "Route not found" 
  });
});

app.listen(8000,()=>{

});

