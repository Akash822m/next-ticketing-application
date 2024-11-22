"use client";
import { useState, useEffect } from "react";
import EditTicketForm from "@/app/(components)/EditTicketForm";

// Define types for the ticket data
interface Ticket {
  _id: string;
  title?: string;
  description?: string;
  priority?: number;
  progress?: number;
  status?: string;
  category?: string;
  createdAt?: string;
}

interface TicketPageProps {
  params: {
    id: string;
  };
}

const TicketPage: React.FC<TicketPageProps> = ({ params }) => {
  const [ticketData, setTicketData] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const EDITMODE = params.id !== "new";

  const fetchTicketById = async (id: string) => {
    try {
      const response = await fetch(`/api/Tickets/${id}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ticket");
      }

      const data = await response.json();
      setTicketData(data.foundTicket);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (EDITMODE) {
      fetchTicketById(params.id);
    } else {
      // Set up default data for a new ticket
      setTicketData({
        _id: "new",
      });
      setIsLoading(false);
    }
  }, [EDITMODE, params.id]);

  if (isLoading) return <p>Loading ticket data...</p>;
  if (!ticketData) return <p>No ticket data available.</p>;

  return <EditTicketForm ticket={ticketData} />;
};

export default TicketPage;
