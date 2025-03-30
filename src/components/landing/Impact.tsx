import { UserPlus, Camera, MessageSquare, LineChart } from "lucide-react";

const Impact = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience seamless waste management with our easy-to-use features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:bg-green-50/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <UserPlus className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Create Account</h3>
            <p className="text-muted-foreground">
              Sign up and get instant access to our waste management platform
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:bg-green-50/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Camera className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Scan Waste</h3>
            <p className="text-muted-foreground">
              Use our AI tool to identify and categorize your waste materials
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:bg-green-50/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Join Community</h3>
            <p className="text-muted-foreground">
              Connect with eco-warriors, share tips, and discuss environmental
              solutions
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:bg-green-50/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <LineChart className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2">4. View Analytics</h3>
            <p className="text-muted-foreground">
              Track your recycling impact and earn rewards for your
              contributions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
