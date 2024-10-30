"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TicketCard from "../(components)/TicketCard"; // Adjust the path if necessary
import TicketTableCard from "../(components)/TicketTableCard";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState({
    "not started": [],
    started: [],
    done: [],
  });

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/Tickets", {
          cache: "no-store",
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.tickets) {
          const organizedTickets = {
            "not started": data.tickets.filter((ticket) => ticket.status === "not started"),
            started: data.tickets.filter((ticket) => ticket.status === "started"),
            done: data.tickets.filter((ticket) => ticket.status === "done"),
          };
          setTickets(organizedTickets);
          console.log("Organized Tickets:", organizedTickets);
        } else {
          console.error("No tickets found in the response");
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      const items = Array.from(tickets[sourceCol]);
      const [movedTicket] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedTicket);
      setTickets((prev) => ({ ...prev, [sourceCol]: items }));
    } else {
      const sourceItems = Array.from(tickets[sourceCol]);
      const destItems = Array.from(tickets[destCol]);
      const [movedTicket] = sourceItems.splice(source.index, 1);
      movedTicket.status = destCol; // Update the status based on the destination column
      destItems.splice(destination.index, 0, movedTicket);

      setTickets((prev) => ({
        ...prev,
        [sourceCol]: sourceItems,
        [destCol]: destItems,
      }));

      await fetch(`/api/Tickets/${movedTicket._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: { status: destCol } }),
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "16px", backgroundColor: "#000", padding: "20px", minHeight: "100vh" }}>
        {Object.keys(tickets).map((column) => (
          <Droppable key={column} droppableId={column}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: "#333",
                  padding: "16px",
                  width: "30%",
                  minHeight: "400px",
                  borderRadius: "8px",
                  color: "#FFF",
                }}
              >
                <h2 style={{ color: "#FFF", textAlign: "center", marginBottom: "30px", marginTop: "25px", }}>{column.toUpperCase()}</h2>
                {tickets[column].length === 0 ? (
                  <p style={{ color: "#999" }}>No tickets available</p>
                ) : (
                  tickets[column].map((ticket, index) => (
                    <Draggable key={ticket._id} draggableId={ticket._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TicketTableCard ticket={ticket} /> {/* Use TicketCard to display ticket */}
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
