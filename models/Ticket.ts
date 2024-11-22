import mongoose, { Schema, Document } from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Use the connection string from environment variables
const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  throw new Error("Missing MongoDB connection string");
}

mongoose.connect(connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

mongoose.Promise = global.Promise;

// Define the interface for the Ticket document
interface ITicket extends Document {
  title: string;
  description: string;
  category: string;
  priority: number;
  progress: number;
  status: string;
  active: boolean;
}

// Define the ticket schema
const ticketSchema = new Schema<ITicket>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: Number, required: true },
    progress: { type: Number, required: true },
    status: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Check if the model already exists (useful for serverless environments)
const Ticket = mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);

export default Ticket;
