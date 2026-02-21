import { Link } from "react-router-dom";
import SuperMemLogo from "./SuperMemLogo";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-6">
          {/* Top row: logo + nav links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/">
              <SuperMemLogo className="h-[60px] w-auto opacity-60 hover:opacity-100 transition-opacity duration-150" />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors duration-150">
                Terms
              </Link>
              <Link to="/privacy-policy" className="hover:text-foreground transition-colors duration-150">
                Privacy
              </Link>
              <Link to="/support" className="hover:text-foreground transition-colors duration-150">
                Support
              </Link>
              <Link to="/manifesto" className="hover:text-foreground transition-colors duration-150">
                Manifesto
              </Link>
              <Link to="/about" className="hover:text-foreground transition-colors duration-150">
                About Us
              </Link>
            </div>
          </div>

          {/* Bottom row: email + copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-4 border-t border-border">
            <a href="mailto:business@supermem.io" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
              business@supermem.io
            </a>
            <span className="text-sm text-muted-foreground">&copy; 2025 SuperMem. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
