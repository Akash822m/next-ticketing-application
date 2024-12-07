// models/UserRequest.ts
import mongoose, { Schema, Document } from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Use the connection string from environment variables
const connectionString = process.env.MONGODB_URI;


mongoose.connect(connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

mongoose.Promise = global.Promise;

interface IUserRequest extends Document { 
  username: string;
  password: string;
  role: string;
  email: string;
}

const userRequestSchema = new Schema<IUserRequest>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String},
    email: {type: String},
  },
  {
    timestamps: true,
  }
);

const UserRequest = mongoose.models.UserRequest || mongoose.model<IUserRequest>("UserRequest", userRequestSchema);

export default UserRequest;