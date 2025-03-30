
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, AlertCircle, ClipboardList, ArrowUpDown, Filter } from "lucide-react";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed";
  location: string;
}

// Demo data
const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Collect recyclables from North District",
    description: "Visit all collection points in North District and collect recyclable materials",
    dueDate: "2023-09-25",
    priority: "high",
    status: "pending",
    location: "North District"
  },
  {
    id: "task-2",
    title: "Process plastic waste",
    description: "Sort and process collected plastic waste for recycling facility",
    dueDate: "2023-09-24",
    priority: "medium",
    status: "in-progress",
    location: "Recycling Center"
  },
  {
    id: "task-3",
    title: "Maintain compost system",
    description: "Check and maintain the community compost system, turn compost as needed",
    dueDate: "2023-09-23",
    priority: "low",
    status: "completed",
    location: "Community Garden"
  },
  {
    id: "task-4",
    title: "Educate residents on e-waste",
    description: "Conduct a workshop on proper e-waste disposal for apartment complex residents",
    dueDate: "2023-09-26",
    priority: "medium",
    status: "pending",
    location: "Central Apartments"
  },
  {
    id: "task-5",
    title: "Hazardous waste collection",
    description: "Special collection of hazardous waste materials from designated drop-off points",
    dueDate: "2023-09-25",
    priority: "high",
    status: "pending",
    location: "Multiple Locations"
  }
];

const TaskManagement = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dueDate");
  
  const handleStatusChange = (taskId: string, status: "pending" | "in-progress" | "completed") => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
    
    toast({
      title: "Task updated",
      description: `Task status changed to ${status}`,
    });
  };
  
  const handleMarkComplete = (taskId: string) => {
    handleStatusChange(taskId, "completed");
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "pending") return task.status === "pending";
    if (filter === "in-progress") return task.status === "in-progress";
    if (filter === "completed") return task.status === "completed";
    if (filter === "high-priority") return task.priority === "high";
    return true;
  });
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === "priority") {
      const priorityValues = { high: 3, medium: 2, low: 1 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    }
    return 0;
  });
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "secondary";
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-eco-500 text-white";
      case "in-progress": return "bg-warning-500 text-white";
      case "pending": return "bg-muted";
      default: return "bg-muted";
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ClipboardList className="h-8 w-8 text-eco-500" />
          Task Management
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filter:</span>
            <ToggleGroup type="single" value={filter} onValueChange={(value) => value && setFilter(value)}>
              <ToggleGroupItem value="all" size="sm">All</ToggleGroupItem>
              <ToggleGroupItem value="pending" size="sm">Pending</ToggleGroupItem>
              <ToggleGroupItem value="high-priority" size="sm">High Priority</ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            <span className="text-sm font-medium">Sort by:</span>
            <ToggleGroup type="single" value={sortBy} onValueChange={(value) => value && setSortBy(value)}>
              <ToggleGroupItem value="dueDate" size="sm">Due Date</ToggleGroupItem>
              <ToggleGroupItem value="priority" size="sm">Priority</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4">
        {sortedTasks.map((task) => (
          <Card key={task.id} className={task.status === "completed" ? "opacity-70" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id={`complete-${task.id}`}
                    checked={task.status === "completed"}
                    onCheckedChange={() => handleMarkComplete(task.id)}
                    className="mt-1"
                  />
                  <div>
                    <CardTitle className={task.status === "completed" ? "line-through text-muted-foreground" : ""}>
                      {task.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  </div>
                </div>
                <Badge variant={getPriorityColor(task.priority) as any}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex flex-wrap gap-2 items-center text-sm">
                  <span className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                    Due: <span className="font-medium ml-1">{new Date(task.dueDate).toLocaleDateString()}</span>
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span>Location: <span className="font-medium">{task.location}</span></span>
                </div>
                
                <div className="flex gap-2">
                  <Badge className={getStatusColor(task.status)}>
                    {task.status === "in-progress" ? "In Progress" : 
                      task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                  
                  {task.status !== "completed" && (
                    <Button size="sm" variant="outline" onClick={() => handleStatusChange(task.id, "in-progress")}>
                      {task.status === "in-progress" ? "Update" : "Start Task"}
                    </Button>
                  )}
                  
                  {task.status !== "completed" && (
                    <Button size="sm" className="gap-1" onClick={() => handleMarkComplete(task.id)}>
                      <CheckCircle2 className="h-4 w-4" />
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {sortedTasks.length === 0 && (
          <Card className="py-8">
            <CardContent className="flex flex-col items-center justify-center text-center pt-6">
              <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No tasks found</h3>
              <p className="text-muted-foreground mt-1">
                There are no tasks matching your current filters.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setFilter("all")}>
                Show All Tasks
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
