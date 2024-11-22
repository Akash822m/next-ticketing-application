import StatusDisplay from "./StatusDisplay";
import PriorityDisplay from "./PriorityDisplay";
import DeleteBlock from "./DeleteBlock";
import ProgressDisplay from "./ProgressDisplay";
import Link from "next/link";
import CategoryDisplay from "./CategoryDisplay";

// Define the Ticket interface
interface Ticket {
  _id: string;
  title: string;
  description: string;
  priority: number;
  progress: number;
  status: string;
  category: string;
  createdAt: string;
}

interface TicketTableCardProps {
  ticket: Ticket;
}

const getColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "done":
      return "bg-green-200";
    case "started":
      return "bg-yellow-200";
    case "not started":
      return "bg-red-200";
    default:
      return "bg-slate-700";
  }
};

const formatTimestamp = (timestamp: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", options);
};

const TicketTableCard: React.FC<TicketTableCardProps> = ({ ticket }) => {
  const createdDateTime = formatTimestamp(ticket.createdAt);

  return (
    <div
      className={`flex flex-col transition-transform duration-300 transform hover:scale-[1.02] bg-card rounded-md shadow-lg p-3 m-2 ${getColor(
        ticket.status
      )}`}
    >
      <div className="flex mb-3">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>
      <Link href={`/TicketPage/${ticket._id}`} style={{ display: "contents" }}>
        <h4 className="mb-1 text-black">{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="whitespace-pre-wrap text-black">{ticket.description}</p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1 text-black">{createdDateTime}</p>
            <ProgressDisplay progress={ticket.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <CategoryDisplay category={ticket.category} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketTableCard;
