
import { Link } from "react-router-dom";
import { Recycle, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Recycle className="h-6 w-6 text-eco-500" />
              <span className="ml-2 text-xl font-bold text-foreground">RenewCycle</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Transforming waste management through technology and community engagement for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary">Our Services</Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link>
              </li>
              <li>
                <Link to="/guides" className="text-muted-foreground hover:text-primary">Recycling Guides</Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary">Events</Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-primary">Support</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground">
              <p className="mb-2">123 Green Street</p>
              <p className="mb-2">Eco City, EC 12345</p>
              <p className="flex items-center mb-2">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:info@renewcycle.com" className="hover:text-primary">info@renewcycle.com</a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} RenewCycle. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
