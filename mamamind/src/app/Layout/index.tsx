"use client";
import React from "react";
import Sidebar from "../components/Sidebar";
// import MotherDetails from "../Singlemother/page";
// import MothersDetails from "../Motherdetails/page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div>
      <Sidebar />
      </div>
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
}
