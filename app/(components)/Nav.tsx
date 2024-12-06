"use client";

import {
  faHome,
  faTable,
  faTicket,
  faSignOutAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

interface NavProps {
  onSearch: (status: string) => void;
}

const Nav: React.FC<NavProps> = ({onSearch}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [username, setUsername] = useState<string | null>(null);


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/auth/validate", { withCredentials: true });
        //console.log("Validation response:", response.data);
        setIsLoggedIn(response.data.loggedIn);
        //console.log("isLoggedIn updated:", response.data.loggedIn);
  
        // if (response.data.loggedIn) {
        //   const userResponse = await axios.get("/api/auth/user", { withCredentials: true });
        //   console.log("User response:", userResponse.data);
        //   setUsername(userResponse.data.username);
        // }
      } catch (error) {
        console.error("Error validating token:", error);
        setIsLoggedIn(false);
        setUsername(null);
      }
    };
  
    checkLoginStatus();
  }, []);
  

  const handleSearch = () => {
    if (onSearch) {
      onSearch(statusFilter);
    }
  };


  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      setIsLoggedIn(false);
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  

  return (
    <nav className="flex justify-between bg-nav p-4">
      {isLoggedIn ? (
        <div className="flex items-center space-x-4">
          <Link href="/MainPage" passHref>
            <FontAwesomeIcon icon={faHome} className="icon cursor-pointer" />
          </Link>
          <Link href="/TicketPage/new" passHref>
            <FontAwesomeIcon icon={faTicket} className="icon cursor-pointer" />
          </Link>
          <Link href="/TicketTable" passHref>
            <FontAwesomeIcon icon={faTable} className="icon cursor-pointer" />
          </Link>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-1 border rounded"
            >
              <option value="">All Statuses</option>
              <option value="not started">Not Started</option>
              <option value="started">Started</option>
              <option value="done">Done</option>
            </select>
            <button
              onClick={handleSearch}
              className="ml-2 text-white p-2 rounded"
            >
              <FontAwesomeIcon icon={faSearch} className="icon cursor-pointer" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <span className="text-white">Please log in to access features.</span>
        </div>
      )}

      {!isLoggedIn ? (
        <div className="flex space-x-4">
          <span>
            <Link href="/login" className="text-white font-bold text-lg">
              Login
            </Link>
          </span>
          <span>
            <Link href="/signup" className="text-white font-bold text-lg">
              Signup
            </Link>
          </span>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          {/* {username && <span className="text-white font-bold">{username}</span>} */}
          <button onClick={handleLogout} className="text-white font-bold text-lg">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon cursor-pointer" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
