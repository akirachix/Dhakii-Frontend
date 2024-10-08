"use client";
import Layout from "./Layout";
import Dashboard from "./components/Dashboard";
import Graphs from './components/Graphs';



export default function Home() {
  return (
<Layout>
<Graphs />
<Dashboard/>
</Layout>
  );
}

