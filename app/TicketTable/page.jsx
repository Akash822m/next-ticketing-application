"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TicketCard from "../(components)/TicketCard";
import TicketTableCard from "../(components)/TicketTableCard";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState({
    "not started": [],
    started: [],
    done: [],
  });
  const router = useRouter();

  // Check authentication status on load


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/Tickets", { cache: "no-store" });
        const data = await response.json();
        if (data.tickets) {
          setTickets({
            "not started": data.tickets.filter((ticket) => ticket.status === "not started"),
            started: data.tickets.filter((ticket) => ticket.status === "started"),
            done: data.tickets.filter((ticket) => ticket.status === "done"),
          });
        } else {
          console.error("No tickets found");
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
      movedTicket.status = destCol;
      destItems.splice(destination.index, 0, movedTicket);
      setTickets((prev) => ({ ...prev, [sourceCol]: sourceItems, [destCol]: destItems }));
      await fetch(`/api/Tickets/${movedTicket._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: { status: destCol } }),
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-container">
        {Object.keys(tickets).map((column) => (
          <Droppable key={column} droppableId={column}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-column">
                <h2 className="kanban-column-header">{column.toUpperCase()}</h2>
                {tickets[column].length === 0 ? (
                  <p style={{ color: "#999" }}>No tickets available</p>
                ) : (
                  tickets[column].map((ticket, index) => (
                    <Draggable key={ticket._id} draggableId={ticket._id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TicketTableCard ticket={ticket} />
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
      <style jsx>{`
        .kanban-container {
          display: flex;
          gap: 16px;
          background-color: #000;
          padding: 20px;
          min-height: 100vh;
        }
        .kanban-column {
          background-color: #333;
          padding: 16px;
          width: 30%;
          min-height: 400px;
          border-radius: 8px;
          color: #fff;
        }
        .kanban-column-header {
          color: #fff;
          text-align: center;
          margin-bottom: 30px;
          margin-top: 25px;
        }
        @media (max-width: 768px) {
          .kanban-container {
            flex-direction: column;
          }
          .kanban-column {
            width: 100%;
          }
        }
      `}</style>
    </DragDropContext>
  );
};

export default KanbanBoard;
