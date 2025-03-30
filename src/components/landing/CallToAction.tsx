import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 eco-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Join the Sustainable Revolution?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Be part of a growing community dedicated to transforming waste
            management and creating a cleaner, greener future for generations to
            come.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-eco-600 hover:bg-white/90"
              asChild
            >
              <Link to="/register">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-white/20 text-white hover:bg-white/30"
              asChild
            >
              <Link to="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
