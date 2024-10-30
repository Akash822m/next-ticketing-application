import { faHome, faTable, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
        <Link href="/TicketTable">
          <FontAwesomeIcon icon={faTable} className="icon" />
        </Link>
      </div>
      <div>
      <Link href="/login" className="text-white font-bold text-lg">
         Login
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
