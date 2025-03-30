
import { useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import WorkerDashboardOverview from "@/components/dashboard/worker/WorkerDashboardOverview";
import DataEntry from "./DataEntry";
import TaskManagement from "./TaskManagement";

const WorkerDashboard = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex h-screen">
      <DashboardSidebar userRole="worker" />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container py-6 px-4 md:px-6 2xl:px-10">
          <Routes>
            <Route path="/" element={<WorkerDashboardOverview />} />
            <Route path="/data-entry" element={<DataEntry />} />
            <Route path="/tasks" element={<TaskManagement />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default WorkerDashboard;
