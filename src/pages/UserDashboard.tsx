import { useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import UserDashboardOverview from "@/components/dashboard/user/UserDashboardOverview";
import CommunityForums from "@/components/dashboard/community/CommunityForums";
import EventsCalendar from "@/components/dashboard/events/EventsCalendar";
import AIWasteRecognition from "@/components/dashboard/aitools/AIWasteRecognition";
import RecyclingGuides from "./RecyclingGuides";
import { useLocation, Route, Routes } from "react-router-dom";
import UserTasks from "@/components/dashboard/user/UserTasks";

const UserDashboard = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex h-screen">
      <DashboardSidebar userRole="user" />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container py-6 px-4 md:px-6 2xl:px-10">
          <Routes>
            <Route index element={<UserDashboardOverview />} />
            <Route path="community" element={<CommunityForums />} />
            <Route path="tasks" element={<UserTasks />} />
            <Route path="events" element={<EventsCalendar />} />
            <Route path="guides" element={<RecyclingGuides />} />
            <Route path="ai-tools" element={<AIWasteRecognition />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
