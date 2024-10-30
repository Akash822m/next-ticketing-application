// models/User.ts
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

interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
