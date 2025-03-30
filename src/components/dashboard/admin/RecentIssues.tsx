import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  TrendingUp,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

// This will be replaced with actual data from your forum
const recentIssues = [
  {
    id: 1,
    title: "Issues with recycling collection in Hadapsar",
    author: "RajeshK",
    category: "Issue",
    tags: ["collection", "service", "urgent"],
    votes: 42,
    comments: 15,
    timeAgo: "2 hours ago",
    status: "Open",
    priority: "High",
  },
  {
    id: 2,
    title: "Waste segregation confusion at Kothrud Community Center",
    author: "PriyaS",
    category: "Discussion",
    tags: ["segregation", "guidance", "community"],
    votes: 38,
    comments: 23,
    timeAgo: "5 hours ago",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Broken recycling bins in Aundh",
    author: "AmitP",
    category: "Issue",
    tags: ["infrastructure", "maintenance"],
    votes: 56,
    comments: 31,
    timeAgo: "1 day ago",
    status: "Open",
    priority: "High",
  },
];

const RecentIssues = () => {
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    categories: [] as string[],
  });

  const filteredIssues = recentIssues.filter((issue) => {
    if (filters.priority && issue.priority !== filters.priority) return false;
    if (filters.status && issue.status !== filters.status) return false;
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(issue.category)
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recent Issues</h2>
          <p className="text-muted-foreground">
            Monitor and manage community reported issues
          </p>
        </div>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                {(filters.priority ||
                  filters.status ||
                  filters.categories.length > 0) &&
                  ` (${
                    [
                      filters.priority,
                      filters.status,
                      ...filters.categories,
                    ].filter(Boolean).length
                  })`}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Issues</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <Label>Priority</Label>
                  <RadioGroup
                    value={filters.priority}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, priority: value }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="High" id="high" />
                      <Label htmlFor="high">High Priority</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Medium" id="medium" />
                      <Label htmlFor="medium">Medium Priority</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Low" id="low" />
                      <Label htmlFor="low">Low Priority</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="all-priority" />
                      <Label htmlFor="all-priority">All Priorities</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label>Status</Label>
                  <RadioGroup
                    value={filters.status}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Open" id="open" />
                      <Label htmlFor="open">Open</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="In Progress" id="in-progress" />
                      <Label htmlFor="in-progress">In Progress</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Resolved" id="resolved" />
                      <Label htmlFor="resolved">Resolved</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="all-status" />
                      <Label htmlFor="all-status">All Statuses</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label>Categories</Label>
                  <div className="space-y-2">
                    {["Issue", "Discussion", "Question"].map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category.toLowerCase()}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={(checked) => {
                            setFilters((prev) => ({
                              ...prev,
                              categories: checked
                                ? [...prev.categories, category]
                                : prev.categories.filter((c) => c !== category),
                            }));
                          }}
                        />
                        <Label htmlFor={category.toLowerCase()}>
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({ priority: "", status: "", categories: [] })
                    }
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            View All Issues
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredIssues.map((issue) => (
          <Card key={issue.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      issue.category === "Issue" ? "destructive" : "secondary"
                    }
                    className={cn(
                      issue.category === "Issue" &&
                        "bg-red-100 text-red-800 hover:bg-red-200",
                      issue.category === "Discussion" &&
                        "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    )}
                  >
                    {issue.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-none",
                      issue.priority === "High" && "bg-red-50 text-red-700",
                      issue.priority === "Medium" &&
                        "bg-yellow-50 text-yellow-700"
                    )}
                  >
                    {issue.priority} Priority
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-none",
                      issue.status === "Open" && "bg-green-50 text-green-700",
                      issue.status === "In Progress" &&
                        "bg-blue-50 text-blue-700"
                    )}
                  >
                    {issue.status}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold">{issue.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {issue.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {issue.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {issue.votes} votes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {issue.comments} comments
                  </span>
                  <span>{issue.timeAgo}</span>
                </div>
              </div>

              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentIssues;
