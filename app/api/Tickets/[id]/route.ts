import { NextResponse } from "next/server";
import Ticket from "@/models/Ticket";

// Define the types for the request and parameters
interface TicketParams {
  id: string;
}

interface TicketData {
  _id: string;
  title?: string;
  description?: string;
  status?: string;
  // Add any other fields based on the Ticket model
}

export async function GET(request: Request, { params }: { params: TicketParams }) {
  const { id } = params;

  try {
    const foundTicket = await Ticket.findOne({ _id: id });
    
    if (!foundTicket) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return NextResponse.json({ message: "Error fetching ticket", error }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: TicketParams }) {
  const { id } = params;

  try {
    const body = await req.json();
    const ticketData: TicketData = body.formData;

    const updatedTicket = await Ticket.findByIdAndUpdate(id, ticketData, { new: true });

    if (!updatedTicket) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ticket updated", updatedTicket }, { status: 200 });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return NextResponse.json({ message: "Error updating ticket", error }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: TicketParams }) {
  const { id } = params;

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ticket deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return NextResponse.json({ message: "Error deleting ticket", error }, { status: 500 });
  }
}
