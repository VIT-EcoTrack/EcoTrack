import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, CheckCircle2, XCircle, Eye } from "lucide-react";

// Mock data for submitted tasks
const submittedTasks = [
  {
    id: 1,
    taskTitle: "Clean Hadapsar Lake Area",
    submittedBy: "Amit Sharma",
    submittedDate: "2024-03-10",
    status: "Pending",
    proofImage: "cleanup_proof.jpg",
    description: "Collected 25kg of waste from the lake area",
    reward: 50,
  },
  {
    id: 2,
    taskTitle: "Organize Recycling Workshop",
    submittedBy: "Priya Patel",
    submittedDate: "2024-03-09",
    status: "Approved",
    proofImage: "workshop_proof.jpg",
    description: "Conducted workshop for 30 participants",
    reward: 100,
  },
  {
    id: 3,
    taskTitle: "Install Composting Unit",
    submittedBy: "Rahul Deshmukh",
    submittedDate: "2024-03-08",
    status: "Rejected",
    proofImage: "compost_proof.jpg",
    description: "Set up community composting unit",
    reward: 75,
  },
];

const TaskManagement = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle task creation logic here
    setIsCreateDialogOpen(false);
  };

  const handleApproveTask = (taskId: number) => {
    // Handle task approval logic here
  };

  const handleRejectTask = (taskId: number) => {
    // Handle task rejection logic here
  };

  const viewTaskDetails = (task: any) => {
    setSelectedTask(task);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Task Management</h2>
          <p className="text-muted-foreground">
            Create and manage community tasks
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Create New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Create a new task for the community
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTask}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input id="title" placeholder="Enter task title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter task description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Task location" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reward">Reward Points</Label>
                    <Input
                      id="reward"
                      type="number"
                      placeholder="Enter reward points"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleanup">Cleanup</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="awareness">Awareness</SelectItem>
                      <SelectItem value="recycling">Recycling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Create Task
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submitted Tasks</CardTitle>
          <CardDescription>
            Review and manage tasks submitted by users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submittedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">
                    {task.taskTitle}
                  </TableCell>
                  <TableCell>{task.submittedBy}</TableCell>
                  <TableCell>{task.submittedDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        task.status === "Approved"
                          ? "bg-green-50 text-green-700"
                          : task.status === "Rejected"
                          ? "bg-red-50 text-red-700"
                          : "bg-yellow-50 text-yellow-700"
                      }
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.reward} points</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewTaskDetails(task)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleApproveTask(task.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRejectTask(task.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Task Title</h4>
                <p>{selectedTask.taskTitle}</p>
              </div>
              <div>
                <h4 className="font-semibold">Description</h4>
                <p>{selectedTask.description}</p>
              </div>
              <div>
                <h4 className="font-semibold">Submitted By</h4>
                <p>{selectedTask.submittedBy}</p>
              </div>
              <div>
                <h4 className="font-semibold">Submission Date</h4>
                <p>{selectedTask.submittedDate}</p>
              </div>
              <div>
                <h4 className="font-semibold">Proof Image</h4>
                <div className="mt-2 rounded-lg bg-gray-100 p-2">
                  <p className="text-sm text-gray-500">Image preview here</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Reward Points</h4>
                <p>{selectedTask.reward} points</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskManagement;
