"use client";
import Layout from "./Layout";
import Sidebar from "./components/Sidebar";
import { PrevalenceCharts } from "./components/graphs";



export default function Home() {
  return (
    <Layout>
      <Sidebar />
      <PrevalenceCharts />
    </Layout>

  );
}

