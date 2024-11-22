import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

// Define the types for the request body
interface TicketData {
  title: string;
  description: string;
  status: string;
  // Add any other fields based on the Ticket model
}

export async function GET() {
  try {
    const tickets = await Ticket.find();
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (err) {
    console.error("Error fetching tickets:", err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ticketData: TicketData = body.formData;

    await Ticket.create(ticketData);

    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (err) {
    console.error("Error creating ticket:", err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
