
import { 
  Leaf, 
  Lightbulb, 
  Users, 
  BarChart, 
  Image, 
  Calendar 
} from "lucide-react";

const features = [
  {
    icon: <Leaf className="h-10 w-10 text-eco-500" />,
    title: "Sustainable Waste Management",
    description: "Turn waste into valuable resources with our innovative sorting and processing techniques."
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-warning-500" />,
    title: "Renewable Energy Generation",
    description: "Convert waste materials into clean energy, reducing dependence on fossil fuels."
  },
  {
    icon: <Users className="h-10 w-10 text-energy-500" />,
    title: "Community Engagement",
    description: "Connect with like-minded individuals and share ideas in our dynamic forums."
  },
  {
    icon: <BarChart className="h-10 w-10 text-energy-600" />,
    title: "Advanced Analytics",
    description: "Track your contributions and view detailed insights on community impact."
  },
  {
    icon: <Image className="h-10 w-10 text-eco-600" />,
    title: "AI Waste Recognition",
    description: "Our AI technology helps identify and categorize waste for optimal recycling."
  },
  {
    icon: <Calendar className="h-10 w-10 text-warning-600" />,
    title: "Educational Events",
    description: "Participate in workshops and events to learn more about sustainable practices."
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Choose RenewCycle?</h2>
          <p className="text-lg text-muted-foreground">
            Our platform combines cutting-edge technology with community engagement to create a sustainable future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
