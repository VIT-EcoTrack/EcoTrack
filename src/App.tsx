
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import NotFound from "./pages/NotFound";
import DataEntry from "./pages/DataEntry";
import TaskManagement from "./pages/TaskManagement";
import Analytics from "./pages/Analytics";
import UserManagement from "./pages/UserManagement";
import RecyclingGuides from "./pages/RecyclingGuides";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          
          {/* User Dashboard Routes */}
          <Route path="/dashboard/*" element={<UserDashboard />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin/*" element={<AdminDashboard />} />
          
          {/* Worker Dashboard Routes */}
          <Route path="/worker/*" element={<WorkerDashboard />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
