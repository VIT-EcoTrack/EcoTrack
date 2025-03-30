import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AdminDashboardOverview from "@/components/dashboard/admin/AdminDashboardOverview";
import WorkersAndTrucks from "@/components/dashboard/admin/WorkersAndTrucks";
import RecentIssues from "@/components/dashboard/admin/RecentIssues";
import TaskManagement from "@/components/dashboard/admin/TaskManagement";

const AdminDashboard = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex h-screen">
      <DashboardSidebar userRole="admin" />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container py-6 px-4 md:px-6 2xl:px-10">
          <Routes>
            <Route index element={<AdminDashboardOverview />} />
            <Route path="workers-trucks" element={<WorkersAndTrucks />} />
            <Route path="issues" element={<RecentIssues />} />
            <Route path="tasks" element={<TaskManagement />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
