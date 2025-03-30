import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  BarChart3,
  Users,
  Map,
  TrendingUp,
  TrendingDown,
  Clock,
  FileText,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Badge } from "@/components/ui/badge";

// Mock data for charts
const areaData = [
  { name: "Jan", waste: 140, energy: 80 },
  { name: "Feb", waste: 125, energy: 65 },
  { name: "Mar", waste: 160, energy: 90 },
  { name: "Apr", waste: 170, energy: 110 },
  { name: "May", waste: 190, energy: 130 },
  { name: "Jun", waste: 205, energy: 150 },
];

const pieData = [
  { name: "Plastic", value: 45 },
  { name: "Paper", value: 25 },
  { name: "Glass", value: 15 },
  { name: "Metal", value: 10 },
  { name: "Organic", value: 5 },
];

const wasteData = [
  { month: "Jan", plastic: 450, paper: 380, metal: 200, organic: 600 },
  { month: "Feb", plastic: 420, paper: 400, metal: 220, organic: 580 },
  { month: "Mar", plastic: 480, paper: 360, metal: 180, organic: 620 },
  { month: "Apr", plastic: 440, paper: 390, metal: 210, organic: 590 },
  { month: "May", plastic: 460, paper: 370, metal: 190, organic: 610 },
  { month: "Jun", plastic: 430, paper: 385, metal: 205, organic: 595 },
];

const energyData = [
  { month: "Jan", generated: 2800, consumed: 2400 },
  { month: "Feb", generated: 2900, consumed: 2500 },
  { month: "Mar", generated: 2750, consumed: 2300 },
  { month: "Apr", generated: 2850, consumed: 2450 },
  { month: "May", generated: 2950, consumed: 2550 },
  { month: "Jun", generated: 2800, consumed: 2400 },
];

const heatmapData = {
  Hadapsar: 85,
  Kothrud: 65,
  Aundh: 75,
  Baner: 70,
  "Viman Nagar": 80,
  Shivajinagar: 90,
  Swargate: 85,
  Kondhwa: 60,
  Warje: 70,
  Katraj: 75,
};

const COLORS = ["#4CAF50", "#2196F3", "#F97316", "#9C27B0", "#607D8B"];

const AdminDashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <div className="flex items-center pt-1 text-xs text-energy-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Waste Collected
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,590 kg</div>
            <div className="flex items-center pt-1 text-xs text-eco-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Energy Generated
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245 kWh</div>
            <div className="flex items-center pt-1 text-xs text-warning-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              <span>-3.1% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Waste Hotspots
            </CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center pt-1 text-xs text-destructive">
              <AlertCircle className="mr-1 h-3 w-3" />
              <span>3 require immediate action</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="waste">Waste Analysis</TabsTrigger>
          <TabsTrigger value="energy">Energy Generation</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Waste Collection & Energy Generation</CardTitle>
                <CardDescription>
                  Monthly trend of waste collected and energy generated
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={areaData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="waste"
                        stackId="1"
                        stroke="#4CAF50"
                        fill="#4CAF50"
                      />
                      <Area
                        type="monotone"
                        dataKey="energy"
                        stackId="2"
                        stroke="#2196F3"
                        fill="#2196F3"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Waste Composition</CardTitle>
                <CardDescription>
                  Distribution of waste types collected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Issues</CardTitle>
              <CardDescription>From community forums</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-destructive pl-4 py-2">
                  <p className="text-sm font-medium">
                    Recycling bin overflowing at Central Park
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Reported by 5 users • High priority
                  </p>
                </div>
                <div className="border-l-4 border-warning-500 pl-4 py-2">
                  <p className="text-sm font-medium">
                    Collection schedule confusion in West District
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Reported by 3 users • Medium priority
                  </p>
                </div>
                <div className="border-l-4 border-energy-500 pl-4 py-2">
                  <p className="text-sm font-medium">
                    Need more glass recycling points in North Area
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Reported by 8 users • Normal priority
                  </p>
                </div>
              </div>
              <Button variant="link" size="sm" className="mt-4 px-0">
                View all issues
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="waste">
          <Card>
            <CardHeader>
              <CardTitle>Waste Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of waste collection and processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wasteData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="plastic" fill="#2563eb" name="Plastic" />
                    <Bar dataKey="paper" fill="#16a34a" name="Paper" />
                    <Bar dataKey="metal" fill="#ca8a04" name="Metal" />
                    <Bar dataKey="organic" fill="#84cc16" name="Organic" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="energy">
          <Card>
            <CardHeader>
              <CardTitle>Energy Generation</CardTitle>
              <CardDescription>
                Energy production statistics and efficiency metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="generated" fill="#16a34a" name="Generated" />
                    <Bar dataKey="consumed" fill="#dc2626" name="Consumed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Waste Collection Heatmap</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(heatmapData).map(([area, value]) => (
            <div key={area} className="space-y-2">
              <p className="text-sm font-medium">{area}</p>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-green-600"
                  style={{ width: `${value}%`, opacity: value / 100 }}
                />
              </div>
              <Badge
                variant="outline"
                className={`${
                  value >= 80
                    ? "bg-red-50 text-red-700"
                    : value >= 70
                    ? "bg-yellow-50 text-yellow-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {value}% capacity
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboardOverview;
