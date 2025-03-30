import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Recycle, LogIn, UserPlus } from "lucide-react";
import authService from "@/services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRole, setRegisterRole] = useState<"user" | "admin" | "worker">("user");
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await authService.login({
        email: loginEmail,
        password: loginPassword
      });
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back to RenewCycle Connect!`,
      });
      
      // Navigate based on role
      if (response.user.role === "user") {
        navigate("/dashboard");
      } else if (response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/worker");
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await authService.register({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        role: registerRole
      });
      
      toast({
        title: "Registration successful",
        description: "Welcome to RenewCycle Connect!",
      });
      
      // Navigate based on role
      if (response.user.role === "user") {
        navigate("/dashboard");
      } else if (response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/worker");
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role: "user" | "admin" | "worker") => {
    setRegisterRole(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Recycle className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold mt-4">RenewCycle Connect</CardTitle>
          <CardDescription>
            Login to access waste management and recycling resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                  {!loading && <LogIn className="ml-2 h-4 w-4" />}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm">
                <Link to="#" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="register-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                  </label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="register-password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                  </label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Select Role
                  </label>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <Button 
                      type="button"
                      variant={registerRole === "user" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleRoleSelect("user")}
                      className="flex-1"
                    >
                      User
                    </Button>
                    <Button 
                      type="button"
                      variant={registerRole === "admin" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleRoleSelect("admin")}
                      className="flex-1"
                    >
                      Admin
                    </Button>
                    <Button 
                      type="button"
                      variant={registerRole === "worker" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleRoleSelect("worker")}
                      className="flex-1"
                    >
                      Worker
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                  {!loading && <UserPlus className="ml-2 h-4 w-4" />}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                By registering, you agree to our
                <Link to="/terms" className="text-primary hover:underline ml-1">
                  Terms of Service
                </Link>
                <span> and </span>
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <Button variant="outline" asChild>
            <Link to="/">
              Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
