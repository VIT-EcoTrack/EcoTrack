
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Users, 
  MoreVertical, 
  Search, 
  UserPlus, 
  Mail, 
  ShieldAlert, 
  ShieldCheck, 
  UserX,
  Filter
} from "lucide-react";

// Sample user data
const initialUsers = [
  {
    id: "u1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-01-15",
    avatar: ""
  },
  {
    id: "u2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "worker",
    status: "active",
    joinDate: "2023-02-10",
    avatar: ""
  },
  {
    id: "u3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "user",
    status: "active",
    joinDate: "2023-03-05",
    avatar: ""
  },
  {
    id: "u4",
    name: "Jessica Lee",
    email: "jessica@example.com",
    role: "user",
    status: "inactive",
    joinDate: "2023-03-12",
    avatar: ""
  },
  {
    id: "u5",
    name: "David Kim",
    email: "david@example.com",
    role: "worker",
    status: "active",
    joinDate: "2023-04-01",
    avatar: ""
  },
  {
    id: "u6",
    name: "Rachel Green",
    email: "rachel@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-04-15",
    avatar: ""
  },
  {
    id: "u7",
    name: "Chris Evans",
    email: "chris@example.com",
    role: "user",
    status: "pending",
    joinDate: "2023-05-20",
    avatar: ""
  }
];

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: "User status updated",
      description: `User status has been changed to ${newStatus}`,
    });
  };
  
  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    
    toast({
      title: "User role updated",
      description: `User role has been changed to ${newRole}`,
    });
  };
  
  const filteredUsers = users.filter(user => {
    // Apply search filter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply role filter
    const matchesRole = filterRole ? user.role === filterRole : true;
    
    // Apply status filter
    const matchesStatus = filterStatus ? user.status === filterStatus : true;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  const clearFilters = () => {
    setFilterRole(null);
    setFilterStatus(null);
    setSearchQuery("");
  };
  
  // Helper to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };
  
  // Helper to get role badge styles
  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-energy-500 text-white hover:bg-energy-600";
      case "worker":
        return "bg-warning-500 text-white hover:bg-warning-600";
      default:
        return "bg-eco-500 text-white hover:bg-eco-600";
    }
  };
  
  // Helper to get status badge styles
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8 text-eco-500" />
          User Management
        </h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Enter the details for the new user. They will receive an email invitation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Email
                </label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="role" className="text-right">
                  Role
                </label>
                <select id="role" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="user">User</option>
                  <option value="worker">Worker</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button onClick={() => {
                toast({
                  title: "Invitation sent",
                  description: "The user has been invited to join the platform",
                });
              }}>
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Filters:</span>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Role: {filterRole || "All"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterRole(null)}>All Roles</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("user")}>User</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("worker")}>Worker</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("admin")}>Admin</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Status: {filterStatus || "All"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus(null)}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("inactive")}>Inactive</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {(filterRole || filterStatus || searchQuery) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Joined</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {user.avatar ? (
                            <AvatarImage src={user.avatar} alt={user.name} />
                          ) : (
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getRoleBadgeStyle(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getStatusBadgeStyle(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2" onClick={() => {
                            toast({
                              title: "Email sent",
                              description: `Email sent to ${user.email}`,
                            });
                          }}>
                            <Mail className="h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => handleRoleChange(user.id, "admin")}
                            disabled={user.role === "admin"}
                          >
                            <ShieldAlert className="h-4 w-4" />
                            Make Admin
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => handleRoleChange(user.id, "worker")}
                            disabled={user.role === "worker"}
                          >
                            <ShieldCheck className="h-4 w-4" />
                            Make Worker
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => handleRoleChange(user.id, "user")}
                            disabled={user.role === "user"}
                          >
                            <Users className="h-4 w-4" />
                            Make User
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          {user.status === "active" ? (
                            <DropdownMenuItem 
                              className="flex items-center gap-2 text-destructive"
                              onClick={() => handleStatusChange(user.id, "inactive")}
                            >
                              <UserX className="h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              className="flex items-center gap-2"
                              onClick={() => handleStatusChange(user.id, "active")}
                            >
                              <ShieldCheck className="h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-10">
                <Users className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No users found</h3>
                <p className="text-muted-foreground mt-1">
                  No users match your current search and filters.
                </p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
