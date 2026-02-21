import { Link, useLocation, useNavigate } from "react-router-dom";
import SuperMemLogo from "./SuperMemLogo";
import { ArrowRight } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleJoinWaitlist = () => {
    if (location.pathname === "/") {
      // Already on homepage — dispatch custom event to open modal
      window.dispatchEvent(new CustomEvent("open-waitlist"));
    } else {
      // Navigate to homepage with query param
      navigate("/?join=true");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <SuperMemLogo className="h-12 w-auto" />
          </Link>

          {/* Navigation links */}
          <div className="flex items-center gap-1">
            {[
              { path: "/", label: "Homepage" },
              { path: "/manifesto", label: "Manifesto" },
              { path: "/about", label: "About Us" },
            ].map((item) => (
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

            {/* CTA */}
            <button
              onClick={handleJoinWaitlist}
              className="ml-3 inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150 hover:-translate-y-px"
            >
              Join Waitlist
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
