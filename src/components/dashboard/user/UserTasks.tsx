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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  ImagePlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for available tasks
const availableTasks = [
  {
    id: 1,
    title: "Clean Hadapsar Lake Area",
    description:
      "Join us in cleaning the Hadapsar lake area. Bring your own gloves and bags. We'll provide the rest of the equipment.",
    location: "Hadapsar Lake",
    reward: 50,
    deadline: "2024-03-20",
    category: "Cleanup",
    status: "Open",
  },
  {
    id: 2,
    title: "Conduct Recycling Workshop",
    description:
      "Organize and conduct a recycling workshop for your neighborhood. Training materials will be provided.",
    location: "Kothrud Community Center",
    reward: 100,
    deadline: "2024-03-25",
    category: "Workshop",
    status: "Open",
  },
];

// Mock data for user's submitted tasks
const userSubmittedTasks = [
  {
    id: 1,
    title: "Plant Trees in Aundh",
    description: "Planted 10 trees in the community garden",
    submittedDate: "2024-03-05",
    status: "Approved",
    reward: 75,
    feedback: "Great work! Trees are properly planted and maintained.",
  },
  {
    id: 2,
    title: "Organize Waste Collection Drive",
    description: "Collected 100kg of recyclable waste",
    submittedDate: "2024-03-08",
    status: "Pending",
    reward: 50,
    feedback: null,
  },
];

const UserTasks = () => {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("available");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmitTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskDescription || !selectedImage) {
      alert("Please provide both description and proof image");
      return;
    }

    // Here you would typically send the data to your backend
    const formData = new FormData();
    formData.append("taskId", selectedTask.id.toString());
    formData.append("description", taskDescription);
    formData.append("image", selectedImage);

    // Mock submission
    console.log("Submitting task:", {
      taskId: selectedTask.id,
      description: taskDescription,
      image: selectedImage.name,
    });

    // Reset form
    setTaskDescription("");
    setSelectedImage(null);
    setImagePreview(null);
    setIsSubmitDialogOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openSubmitDialog = (task: any) => {
    setSelectedTask(task);
    setTaskDescription("");
    setSelectedImage(null);
    setImagePreview(null);
    setIsSubmitDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Community Tasks</h2>
        <p className="text-muted-foreground">
          Complete tasks to earn rewards and help the environment
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-card">
          <TabsTrigger
            value="available"
            className={cn(
              "data-[state=active]:bg-green-50 data-[state=active]:text-green-700",
              "hover:text-green-700"
            )}
          >
            Available Tasks
          </TabsTrigger>
          <TabsTrigger
            value="submitted"
            className={cn(
              "data-[state=active]:bg-green-50 data-[state=active]:text-green-700",
              "hover:text-green-700"
            )}
          >
            My Submissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableTasks.map((task) => (
              <Card
                key={task.id}
                className="hover:border-green-200 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{task.title}</CardTitle>
                      <CardDescription>{task.location}</CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700"
                    >
                      {task.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Due: {task.deadline}</span>
                      </div>
                      <div className="font-semibold text-green-600">
                        {task.reward} points
                      </div>
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-500"
                      onClick={() => openSubmitDialog(task)}
                    >
                      Submit Task
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userSubmittedTasks.map((task) => (
              <Card
                key={task.id}
                className="hover:border-green-200 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{task.title}</CardTitle>
                      <CardDescription>{task.submittedDate}</CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        task.status === "Approved" &&
                          "bg-green-50 text-green-700",
                        task.status === "Rejected" && "bg-red-50 text-red-700",
                        task.status === "Pending" &&
                          "bg-yellow-50 text-yellow-700"
                      )}
                    >
                      {task.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-green-600">
                        {task.reward} points
                      </div>
                      {task.status === "Approved" && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Completed
                        </div>
                      )}
                      {task.status === "Rejected" && (
                        <div className="flex items-center text-red-600">
                          <XCircle className="mr-1 h-4 w-4" />
                          Rejected
                        </div>
                      )}
                    </div>
                    {task.feedback && (
                      <div className="text-sm bg-green-50 p-3 rounded-lg">
                        <span className="font-semibold">Feedback: </span>
                        {task.feedback}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Task</DialogTitle>
            <DialogDescription>
              Provide details about your task completion
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitTask}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Task</Label>
                <p className="text-sm font-medium">{selectedTask?.title}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe how you completed the task"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Proof of Completion</Label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="image-upload"
                    className={cn(
                      "h-32 flex flex-col items-center justify-center rounded-md border-2 border-dashed",
                      "hover:border-green-200 hover:bg-green-50 transition-colors cursor-pointer"
                    )}
                  >
                    <ImagePlus className="h-8 w-8 mb-2 text-green-600" />
                    <span className="text-sm text-muted-foreground">
                      Upload Image
                    </span>
                  </label>
                  {imagePreview ? (
                    <div className="h-32 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 hover:bg-green-50"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="h-32 flex items-center justify-center rounded-md border-2 border-dashed">
                      <span className="text-sm text-muted-foreground">
                        Image Preview
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSubmitDialogOpen(false)}
                className="hover:bg-green-50 hover:text-green-700"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-500">
                Submit Task
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserTasks;
