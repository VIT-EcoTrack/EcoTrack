import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const workers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Driver",
    area: "Hadapsar",
    status: "Active",
    phone: "+91 98765 43210",
    experience: "5 years",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Collector",
    area: "Kothrud",
    status: "Active",
    phone: "+91 87654 32109",
    experience: "3 years",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Driver",
    area: "Aundh",
    status: "On Leave",
    phone: "+91 76543 21098",
    experience: "4 years",
  },
  {
    id: 4,
    name: "Sneha Deshmukh",
    role: "Collector",
    area: "Baner",
    status: "Active",
    phone: "+91 65432 10987",
    experience: "2 years",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Driver",
    area: "Viman Nagar",
    status: "Active",
    phone: "+91 54321 09876",
    experience: "6 years",
  },
];

const trucks = [
  {
    id: "MH12AB1234",
    type: "Compactor",
    area: "Hadapsar",
    status: "Active",
    lastService: "2024-02-15",
    nextService: "2024-03-15",
    driver: "Rajesh Kumar",
  },
  {
    id: "MH12CD5678",
    type: "Tipper",
    area: "Kothrud",
    status: "Maintenance",
    lastService: "2024-02-10",
    nextService: "2024-03-10",
    driver: "Sunil Jadhav",
  },
  {
    id: "MH12EF9012",
    type: "Compactor",
    area: "Aundh",
    status: "Active",
    lastService: "2024-02-20",
    nextService: "2024-03-20",
    driver: "Amit Patel",
  },
  {
    id: "MH12GH3456",
    type: "Skip Loader",
    area: "Baner",
    status: "Active",
    lastService: "2024-02-25",
    nextService: "2024-03-25",
    driver: "Manoj Pawar",
  },
];

const WorkersAndTrucks = () => {
  const [activeTab, setActiveTab] = useState<"workers" | "trucks">("workers");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Workers & Trucks
          </h2>
          <p className="text-muted-foreground">
            Manage your workforce and vehicle fleet
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "workers" ? "default" : "outline"}
            onClick={() => setActiveTab("workers")}
          >
            Workers
          </Button>
          <Button
            variant={activeTab === "trucks" ? "default" : "outline"}
            onClick={() => setActiveTab("trucks")}
          >
            Trucks
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={`Search ${activeTab}...`} className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Add New {activeTab === "workers" ? "Worker" : "Truck"}
        </Button>
      </div>

      {activeTab === "workers" ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell className="font-medium">{worker.name}</TableCell>
                  <TableCell>{worker.role}</TableCell>
                  <TableCell>{worker.area}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        worker.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }
                    >
                      {worker.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{worker.phone}</TableCell>
                  <TableCell>{worker.experience}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Service</TableHead>
                <TableHead>Next Service</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trucks.map((truck) => (
                <TableRow key={truck.id}>
                  <TableCell className="font-medium">{truck.id}</TableCell>
                  <TableCell>{truck.type}</TableCell>
                  <TableCell>{truck.area}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        truck.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }
                    >
                      {truck.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{truck.lastService}</TableCell>
                  <TableCell>{truck.nextService}</TableCell>
                  <TableCell>{truck.driver}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};

export default WorkersAndTrucks;
