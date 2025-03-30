import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Recycle } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Recycle className="h-8 w-8 text-eco-500" />
              <span className="ml-2 text-xl font-bold text-foreground">
                Eco Track
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
            <div className="ml-4 flex items-center">
              <Button variant="outline" className="mr-2" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background">
            <Link
              to="/"
              className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
