
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowUp, ArrowDown, TrendingUp, BarChart as BarChartIcon, PieChart as PieChartIcon, MapPin } from "lucide-react";

// Mock data for charts
const wasteData = [
  { month: "Jan", plastic: 240, glass: 180, paper: 320, metal: 150, organic: 450 },
  { month: "Feb", plastic: 300, glass: 200, paper: 280, metal: 170, organic: 410 },
  { month: "Mar", plastic: 320, glass: 230, paper: 300, metal: 140, organic: 470 },
  { month: "Apr", plastic: 290, glass: 220, paper: 340, metal: 180, organic: 490 },
  { month: "May", plastic: 350, glass: 250, paper: 360, metal: 190, organic: 520 },
  { month: "Jun", plastic: 380, glass: 270, paper: 290, metal: 210, organic: 550 },
];

const energyData = [
  { month: "Jan", generated: 120, consumed: 100 },
  { month: "Feb", generated: 140, consumed: 110 },
  { month: "Mar", generated: 160, consumed: 115 },
  { month: "Apr", generated: 180, consumed: 125 },
  { month: "May", generated: 200, consumed: 130 },
  { month: "Jun", generated: 220, consumed: 140 },
];

const wasteDistribution = [
  { name: "Plastic", value: 35 },
  { name: "Glass", value: 20 },
  { name: "Paper", value: 25 },
  { name: "Metal", value: 10 },
  { name: "Organic", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const hotspots = [
  { id: 1, name: "Downtown Area", wasteVolume: 850, trend: "up", percent: 12 },
  { id: 2, name: "Industrial Park", wasteVolume: 720, trend: "up", percent: 8 },
  { id: 3, name: "Residential East", wasteVolume: 580, trend: "down", percent: 5 },
  { id: 4, name: "Commercial Center", wasteVolume: 490, trend: "down", percent: 3 },
  { id: 5, name: "Riverside District", wasteVolume: 420, trend: "up", percent: 15 },
];

const Analytics = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <TrendingUp className="h-8 w-8 text-energy-500" />
        Analytics & Insights
      </h1>
      
      <Tabs defaultValue="waste">
        <TabsList className="mb-6">
          <TabsTrigger value="waste">Waste Analytics</TabsTrigger>
          <TabsTrigger value="energy">Energy Generation</TabsTrigger>
          <TabsTrigger value="hotspots">Waste Hotspots</TabsTrigger>
        </TabsList>
        
        <TabsContent value="waste" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChartIcon className="h-5 w-5 text-eco-500" />
                  Waste Collection by Type
                </CardTitle>
                <CardDescription>Monthly waste collection volumes by material type (kg)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={wasteData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="plastic" name="Plastic" fill="#0088FE" />
                      <Bar dataKey="glass" name="Glass" fill="#00C49F" />
                      <Bar dataKey="paper" name="Paper" fill="#FFBB28" />
                      <Bar dataKey="metal" name="Metal" fill="#FF8042" />
                      <Bar dataKey="organic" name="Organic" fill="#8884D8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-eco-500" />
                  Waste Distribution
                </CardTitle>
                <CardDescription>Current distribution of waste materials by percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {wasteDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Important observations from waste collection data</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Overall Trend</h3>
                <p className="text-sm text-muted-foreground">
                  Waste collection volume has increased by 15% compared to the previous quarter, with plastic waste showing the highest growth.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Recycling Rate</h3>
                <p className="text-sm text-muted-foreground">
                  The overall recycling rate has improved to 68%, up from 61% last quarter, indicating successful community engagement.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Recommendation</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on plastic waste reduction initiatives and expand organic waste processing capacity to meet increasing volumes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="energy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Generation & Consumption</CardTitle>
              <CardDescription>Monthly energy generated from waste vs. consumption (MWh)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={energyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="generated" name="Energy Generated" fill="#22c55e" />
                    <Bar dataKey="consumed" name="Energy Consumed" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Energy Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">1,020 MWh</span>
                  <span className="text-sm text-eco-500 flex items-center mb-1">
                    <ArrowUp className="h-4 w-4 mr-1" /> 22%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Compared to previous quarter
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Conversion Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">31.5%</span>
                  <span className="text-sm text-eco-500 flex items-center mb-1">
                    <ArrowUp className="h-4 w-4 mr-1" /> 3.2%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Improved from last measurement
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Carbon Offset</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">685 tons</span>
                  <span className="text-sm text-eco-500 flex items-center mb-1">
                    <ArrowUp className="h-4 w-4 mr-1" /> 15%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  CO₂ emissions prevented this quarter
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="hotspots">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-eco-500" />
                Waste Hotspots
              </CardTitle>
              <CardDescription>Areas with significant waste generation requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Location</th>
                      <th className="text-left py-3 px-4">Waste Volume (kg)</th>
                      <th className="text-left py-3 px-4">Trend</th>
                      <th className="text-left py-3 px-4">Change</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotspots.map((spot) => (
                      <tr key={spot.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{spot.name}</td>
                        <td className="py-3 px-4">{spot.wasteVolume} kg</td>
                        <td className="py-3 px-4">
                          {spot.trend === "up" ? (
                            <ArrowUp className="h-5 w-5 text-destructive" />
                          ) : (
                            <ArrowDown className="h-5 w-5 text-eco-500" />
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={spot.trend === "up" ? "text-destructive" : "text-eco-500"}>
                            {spot.trend === "up" ? "+" : "-"}{spot.percent}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Recommendations</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <ArrowUp className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <span>
                      <strong>Downtown Area and Riverside District</strong> show concerning increases in waste volume. Schedule additional collections and investigate root causes.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowDown className="h-4 w-4 text-eco-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Residential East and Commercial Center</strong> show improvements. Continue current education and collection strategies in these areas.
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Add the Button component to fix the reference in the hotspots table
const Button = ({ children, variant = "default", size = "default" }) => {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
        ${variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"}
        ${size === "sm" ? "h-9 rounded-md px-3" : "h-10 px-4 py-2"}
      `}
    >
      {children}
    </button>
  );
};

export default Analytics;
