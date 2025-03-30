import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Transforming Waste into
              <span className="text-primary"> Sustainable Energy</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Join our innovative platform that connects communities,
              technology, and sustainability to create a cleaner future through
              intelligent waste management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in order-first lg:order-last">
            <div className="relative h-64 sm:h-80 lg:h-96 w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-eco-200 to-eco-600 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="relative p-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-32 w-32 bg-white/20 rounded-full animate-spin-slow"></div>
                    <div
                      className="h-48 w-48 bg-white/10 rounded-full animate-spin-slow"
                      style={{ animationDuration: "6s" }}
                    ></div>
                    <div
                      className="h-64 w-64 bg-white/5 rounded-full animate-spin-slow"
                      style={{ animationDuration: "10s" }}
                    ></div>
                  </div>
                  <svg
                    className="relative w-24 h-24 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.03 7.03 1 12 1C16.97 1 21 5.03 21 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 16L7 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M15 16L17 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 13V19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
