"use client";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
   
      <div className="text-4xl">
        {children}
      </div>
    </div>
  );
}
