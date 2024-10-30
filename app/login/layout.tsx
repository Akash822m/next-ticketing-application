import React from "react";

// app/login/layout.tsx
export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
       
        <main>{children}</main>
        
      </div>
    );
  }
  