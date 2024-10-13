

"use client";
import React from "react";
import Sidebar from "../components/Sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Sidebar />
      <div className="text-4xl">
        {children}
      </div>
    </div>
  );
}