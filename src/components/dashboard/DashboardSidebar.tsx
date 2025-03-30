import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Calendar,
  BookOpen,
  MessageSquare,
  Upload,
  Settings,
  ClipboardList,
  Database,
  AlertCircle,
  LogOut,
  FileText,
  Camera,
  Truck,
  CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarProps = {
  userRole: "user" | "admin" | "worker";
};

const DashboardSidebar = ({ userRole }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const buttonStyles = (isActivePath: boolean) =>
    cn(
      "w-full justify-start mb-1",
      isActivePath
        ? "bg-green-100 text-green-700 hover:bg-green-200"
        : "hover:bg-green-50 hover:text-green-700"
    );

  const renderUserLinks = () => (
    <>
      <Button
        variant={location.pathname === "/dashboard" ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/dashboard">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Overview
        </Link>
      </Button>

      <Button
        variant={
          location.pathname === "/dashboard/community" ? "default" : "ghost"
        }
        className="w-full justify-start"
        asChild
      >
        <Link to="/dashboard/community">
          <MessageSquare className="mr-2 h-4 w-4" />
          Community
        </Link>
      </Button>

      <Button
        variant={location.pathname === "/dashboard/tasks" ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/dashboard/tasks">
          <CheckSquare className="mr-2 h-4 w-4" />
          Tasks
        </Link>
      </Button>

      <Button
        variant={
          location.pathname === "/dashboard/events" ? "default" : "ghost"
        }
        className="w-full justify-start"
        asChild
      >
        <Link to="/dashboard/events">
          <Calendar className="mr-2 h-4 w-4" />
          Events
        </Link>
      </Button>

      <Button
        variant={
          location.pathname === "/dashboard/guides" ? "default" : "ghost"
        }
        className="w-full justify-start"
        asChild
      >
        <Link to="/dashboard/guides">
          <BookOpen className="mr-2 h-4 w-4" />
          Guides
        </Link>
      </Button>

      <Button
        variant={
          location.pathname === "/dashboard/ai-tools" ? "default" : "ghost"
        }
        className="w-full justify-start"
        asChild
      >
        <Link to="/dashboard/ai-tools">
          <Camera className="mr-2 h-4 w-4" />
          AI Tools
        </Link>
      </Button>
    </>
  );

  const renderAdminLinks = () => (
    <>
      <Button
        variant={location.pathname === "/admin" ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Overview
        </Link>
      </Button>
      <Button
        variant={
          location.pathname === "/admin/workers-trucks" ? "default" : "ghost"
        }
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin/workers-trucks">
          <Truck className="mr-2 h-4 w-4" />
          Workers & Trucks
        </Link>
      </Button>
      <Button
        variant={location.pathname === "/admin/tasks" ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin/tasks">
          <CheckSquare className="mr-2 h-4 w-4" />
          Task Management
        </Link>
      </Button>
      <Button
        variant={location.pathname === "/admin/issues" ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/admin/issues">
          <AlertCircle className="mr-2 h-4 w-4" />
          Recent Issues
        </Link>
      </Button>
    </>
  );

  const renderWorkerLinks = () => (
    <>
      <Button
        variant={location.pathname === "/worker" ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/worker">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Overview
        </Link>
      </Button>

      <Button
        variant={
          location.pathname === "/worker/data-entry" ? "default" : "ghost"
        }
        className="w-full justify-start"
        asChild
      >
        <Link to="/worker/data-entry">
          <Database className="mr-2 h-4 w-4" />
          Data Entry
        </Link>
      </Button>

      <Button
        variant={location.pathname === "/worker/tasks" ? "default" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link to="/worker/tasks">
          <ClipboardList className="mr-2 h-4 w-4" />
          Tasks
        </Link>
      </Button>
    </>
  );

  return (
    <div className="h-screen w-64 border-r border-border bg-card">
      <div className="flex flex-col h-full p-4">
        <div className="py-4 mb-6 flex items-center">
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
            {userRole === "user" ? "U" : userRole === "admin" ? "A" : "W"}
          </div>
          <div className="ml-3">
            <p className="font-semibold text-sm">
              {userRole === "user"
                ? "User Dashboard"
                : userRole === "admin"
                ? "Admin Panel"
                : "Worker Portal"}
            </p>
            <p className="text-xs text-muted-foreground">
              {userRole === "user"
                ? "Community Member"
                : userRole === "admin"
                ? "Administrator"
                : "Field Operator"}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-1">
          {userRole === "user" && renderUserLinks()}
          {userRole === "admin" && renderAdminLinks()}
          {userRole === "worker" && renderWorkerLinks()}
        </div>

        <div className="pt-4 border-t border-border mt-4">
          <Link to="/settings">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start mb-1",
                isActive("/settings")
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "hover:bg-green-50 hover:text-green-700"
              )}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
