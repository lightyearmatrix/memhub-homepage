import { cn } from "@/lib/utils";
import superMemLogo from "@/assets/supermem-logo.png";

interface SuperMemLogoProps {
  className?: string;
}

const SuperMemLogo = ({ className }: SuperMemLogoProps) => {
  return (
    <img
      src={superMemLogo}
      alt="SuperMem"
      className={cn("h-10 w-auto", className)}
    />
  );
};

export default SuperMemLogo;
