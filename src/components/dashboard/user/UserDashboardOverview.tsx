
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  TrendingUp, 
  Calendar, 
  MessageSquare 
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for the dashboard
const recyclingData = [
  { name: "Jan", amount: 42 },
  { name: "Feb", amount: 38 },
  { name: "Mar", amount: 55 },
  { name: "Apr", amount: 47 },
  { name: "May", amount: 63 },
  { name: "Jun", amount: 58 },
];

const UserDashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Eco Tokens</CardTitle>
            <Award className="h-4 w-4 text-eco-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,420</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
            <Progress value={78} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-energy-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#12</div>
            <p className="text-xs text-muted-foreground">Top 5% of all users</p>
            <Progress value={95} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-warning-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Community Cleanup</p>
            <Progress value={50} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Forum Activity</CardTitle>
            <MessageSquare className="h-4 w-4 text-eco-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 replies to your posts</p>
            <Progress value={60} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recycling Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recyclingData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}kg`} />
                  <Tooltip 
                    formatter={(value) => [`${value}kg`, "Amount"]}
                    contentStyle={{ 
                      backgroundColor: "white", 
                      borderRadius: "0.5rem",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#4CAF50" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-eco-100 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-eco-600" />
                </div>
                <div>
                  <p className="font-medium">Consistent Recycler</p>
                  <p className="text-sm text-muted-foreground">Recycled waste for 3 consecutive weeks</p>
                </div>
                <div className="ml-auto">
                  <span className="bg-eco-100 text-eco-800 text-xs px-2 py-1 rounded-full">+50 tokens</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-energy-100 flex items-center justify-center mr-3">
                  <MessageSquare className="h-5 w-5 text-energy-600" />
                </div>
                <div>
                  <p className="font-medium">Community Contributor</p>
                  <p className="text-sm text-muted-foreground">Posted 5 helpful solutions in the forums</p>
                </div>
                <div className="ml-auto">
                  <span className="bg-energy-100 text-energy-800 text-xs px-2 py-1 rounded-full">+75 tokens</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-warning-100 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-warning-600" />
                </div>
                <div>
                  <p className="font-medium">Event Participant</p>
                  <p className="text-sm text-muted-foreground">Attended the neighborhood cleanup event</p>
                </div>
                <div className="ml-auto">
                  <span className="bg-warning-100 text-warning-800 text-xs px-2 py-1 rounded-full">+100 tokens</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardOverview;
