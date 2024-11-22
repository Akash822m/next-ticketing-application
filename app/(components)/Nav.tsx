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

// Utility to get cookies
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

const Nav: React.FC = () => {
  // State to track whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("token"); // Get the token from cookies
    if (token) {
      // Optional: you can validate the token here with a backend API
      setIsLoggedIn(true); // If token exists, user is logged in
    }
  }, []);

  const handleLogout = () => {
    // Clear token from cookies or local storage
    document.cookie = "token=; Max-Age=0"; // Delete token cookie

    setIsLoggedIn(false);
    // Optionally redirect to login page
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <nav className="flex justify-between bg-nav p-4">
      {/* Links available only to logged-in users */}
      {isLoggedIn ? (
        <div className="flex items-center space-x-4">
          <Link href="/" passHref>
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

      {/* Login and Signup links */}
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
        // Show logout button when logged in
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="text-white font-bold text-lg"
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="icon cursor-pointer"
            />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
