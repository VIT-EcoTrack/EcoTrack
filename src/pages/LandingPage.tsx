
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Impact from "@/components/landing/Impact";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Impact />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
