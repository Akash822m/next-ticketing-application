import mongoose, { Schema } from "mongoose";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Use the connection string from environment variables
const connectionString = process.env.MONGODB_URI;


mongoose.connect(connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
