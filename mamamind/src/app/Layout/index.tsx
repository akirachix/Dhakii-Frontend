"use client";
import React from "react";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
    
      <Sidebar />
      <div className="flex-grow ml-72 p-4">
        {children}
      </div>
    </div>
  );
}
