import React from "react";
import Nav from "../(components)/Nav";

// app/login/layout.tsx
export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
       <Nav/>
        <main className="flex-grow overflow-y-auto bg-page text-default-text">{children}</main>
        
      </div>
    );
  }
  