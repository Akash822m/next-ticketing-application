// app/login/layout.tsx
import React from "react";
import Nav from "../(components)/Nav";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const handleSearch = (status: string) => {
    console.log("Search triggered with status:", status);
  };

  return (
    <div>
      <Nav />
      <main className="flex-grow overflow-y-auto bg-page text-default-text">
        {children}
      </main>
    </div>
  );
}
