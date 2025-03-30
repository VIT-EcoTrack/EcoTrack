
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  TrendingUp,
} from "lucide-react";

const taskItems = [
  {
    id: 1,
    title: "Waste Collection - Central District",
    status: "pending",
    priority: "high",
    deadline: "Today, 3:00 PM",
  },
  {
    id: 2,
    title: "Data Entry - Weekly Recycling Report",
    status: "in-progress",
    priority: "medium",
    deadline: "Tomorrow, 12:00 PM",
  },
  {
    id: 3,
    title: "Equipment Maintenance Check",
    status: "pending",
    priority: "low",
    deadline: "Jun 15, 5:00 PM",
  },
  {
    id: 4,
    title: "Collection Route Optimization",
    status: "completed",
    priority: "medium",
    deadline: "Jun 10, 4:00 PM",
  },
];

const WorkerDashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Worker Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            June 14, 2024
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 high priority</p>
            <div className="mt-2 flex items-center space-x-2">
              <Progress value={40} className="h-2" />
              <span className="text-xs font-medium">40%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-eco-600 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              On track for daily goals
            </p>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-eco-500 rounded-full" style={{ width: "40%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-warning-600">Est. completion: 2 hours</p>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-warning-500 rounded-full" style={{ width: "20%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-destructive">1 approaching deadline</p>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-destructive rounded-full" style={{ width: "40%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Overview</CardTitle>
          <CardDescription>View and manage your assigned tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {taskItems.map((task) => (
              <div key={task.id} className="flex items-start p-3 border rounded-lg border-border hover:bg-muted/50 transition-colors">
                <div className="mr-4 mt-0.5">
                  {task.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-eco-500" />
                  ) : task.status === "in-progress" ? (
                    <Clock className="h-5 w-5 text-warning-500" />
                  ) : (
                    <div className={`h-5 w-5 rounded-full border-2 ${
                      task.priority === "high" 
                      ? "border-destructive" 
                      : task.priority === "medium" 
                      ? "border-warning-500" 
                      : "border-muted-foreground"
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{task.title}</h4>
                    <div className="flex items-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === "high" 
                        ? "bg-destructive/10 text-destructive" 
                        : task.priority === "medium" 
                        ? "bg-warning-500/10 text-warning-600" 
                        : "bg-muted text-muted-foreground"
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">{task.deadline}</span>
                  </div>
                </div>
                <div className="ml-4">
                  {task.status !== "completed" && (
                    <Button size="sm" variant={task.status === "in-progress" ? "outline" : "default"} className="text-xs h-8">
                      {task.status === "in-progress" ? "Update" : "Start Task"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline" className="w-full">View All Tasks</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Data Entries</CardTitle>
            <CardDescription>Last 5 submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium text-sm">Plastic Collection - North Zone</p>
                  <p className="text-xs text-muted-foreground">June 13, 2024 • 230kg</p>
                </div>
                <span className="text-xs bg-eco-100 text-eco-800 px-2 py-1 rounded-full">Verified</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium text-sm">Glass Recycling - East District</p>
                  <p className="text-xs text-muted-foreground">June 12, 2024 • 145kg</p>
                </div>
                <span className="text-xs bg-eco-100 text-eco-800 px-2 py-1 rounded-full">Verified</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium text-sm">Paper Collection - Schools Program</p>
                  <p className="text-xs text-muted-foreground">June 11, 2024 • 87kg</p>
                </div>
                <span className="text-xs bg-warning-100 text-warning-800 px-2 py-1 rounded-full">Pending</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium text-sm">Organic Waste - Community Gardens</p>
                  <p className="text-xs text-muted-foreground">June 10, 2024 • 320kg</p>
                </div>
                <span className="text-xs bg-eco-100 text-eco-800 px-2 py-1 rounded-full">Verified</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-sm">Metal Recycling - Industrial Zone</p>
                  <p className="text-xs text-muted-foreground">June 9, 2024 • 410kg</p>
                </div>
                <span className="text-xs bg-eco-100 text-eco-800 px-2 py-1 rounded-full">Verified</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Equipment Status</CardTitle>
            <CardDescription>Monitoring tools and vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Collection Truck #103</span>
                  <span className="text-xs bg-eco-100 text-eco-800 px-2 py-1 rounded-full">Operational</span>
                </div>
                <Progress value={92} className="h-2" />
                <p className="text-xs text-muted-foreground">Fuel level: 92% • Next maintenance: Jun 23</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Waste Compactor #5</span>
                  <span className="text-xs bg-warning-100 text-warning-800 px-2 py-1 rounded-full">Maintenance Required</span>
                </div>
                <Progress value={45} className="h-2" />
                <p className="text-xs text-muted-foreground">Efficiency: 45% • Schedule maintenance ASAP</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sorting Conveyor #2</span>
                  <span className="text-xs bg-eco-100 text-eco-800 px-2 py-1 rounded-full">Operational</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground">Performance: 85% • Regular operation</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Material Scanner</span>
                  <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded-full">Offline</span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-xs text-muted-foreground">Status: Technical issue • Report filed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerDashboardOverview;
