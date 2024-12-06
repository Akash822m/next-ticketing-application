"use client";

import {
  faHome,
  faTable,
  faTicket,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const Nav: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/auth/validate", { withCredentials: true });
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("Error validating token:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

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
          <button onClick={handleLogout} className="text-white font-bold text-lg">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon cursor-pointer" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
