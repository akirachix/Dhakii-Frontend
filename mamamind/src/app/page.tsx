"use client";
import NurseList from "./components/NurseList";
import { PrevalenceCharts } from "./components/graphs";

export default function Home() {
  return (
    <div>
      <NurseList />
      <PrevalenceCharts />
    </div>
  );
}
