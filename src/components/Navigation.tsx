import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SuperMemLogo from "./SuperMemLogo";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { path: "/", label: "Homepage" },
  { path: "/manifesto", label: "Manifesto" },
  { path: "/about", label: "About Us" },
];

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleJoinWaitlist = () => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("open-waitlist"));
    } else {
      navigate("/?join=true");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-6 py-1 md:py-1.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <SuperMemLogo className="h-10 md:h-[58px] w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link key={item.path} to={item.path}>
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}

            <button
              onClick={handleJoinWaitlist}
              className="ml-3 inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150 hover:-translate-y-px"
            >
              Join Waitlist
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
              >
                <span
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <button
              onClick={handleJoinWaitlist}
              className="mt-2 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150"
            >
              Join Waitlist
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
