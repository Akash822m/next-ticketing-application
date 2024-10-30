"use client";
import React, { useState, useEffect } from "react";
import TicketCard from "./(components)/TicketCard";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/Tickets", {
        cache: "no-store",
      });
      
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
  const uniqueCategories = [...new Set(tickets.map(({ category }) => category))];

  if (isLoading) return <p>Loading tickets...</p>;
  if (!tickets.length) return <p>No tickets available.</p>;

  return (
    <div className="p-5">
      <div>
        {uniqueCategories.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, _index) => (
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

export default Dashboard;
