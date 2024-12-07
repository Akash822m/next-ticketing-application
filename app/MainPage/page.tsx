"use client";
import React, { useState, useEffect } from "react";
import TicketCard from "../(components)/TicketCard";
import Nav from "../(components)/Nav";

interface Ticket {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  priority?: number;
  status?: "not started" | "started" | "done";
  createdAt?: string;
}

const MainPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTickets = async (status?: string) => {
    try {
      const url = status ? `/api/Tickets?status=${status}` : "/api/Tickets";
      const response = await fetch(url, { cache: "no-store" });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.tickets) {
        setTickets(data.tickets);
      } else {
        console.error("No tickets found in the response");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Get unique categories
  const uniqueCategories = Array.from(
    new Set(tickets.map(({ category }) => category || "Uncategorized"))
  );

  const handleSearch = (status: string) => {
    setIsLoading(true);
    fetchTickets(status); // Fetch tickets based on status filter
  };

  if (isLoading) return <p>Loading tickets...</p>;
  if (!tickets.length) return <p>No tickets available.</p>;

  return (
    <div className="p-5">
      <Nav onSearch={handleSearch} />
      <div>
        {uniqueCategories.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket) => (
                  <TicketCard
                    id={filteredTicket._id}
                    key={filteredTicket._id}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
