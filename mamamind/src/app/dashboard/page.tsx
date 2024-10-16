


import { PrevalenceCharts } from "../components/graphs";
import Sidebar from "../components/Sidebar";  

const Dashboard = () => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />

      <div className="flex-1 p-4 overflow-y-auto">
        <PrevalenceCharts />
      </div>
    </div>
  );
};

export default Dashboard;
