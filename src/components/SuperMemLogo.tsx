import { cn } from "@/lib/utils";
import logoSvg from "@/assets/logo.svg";

interface SuperMemLogoProps {
  className?: string;
}

const SuperMemLogo = ({ className }: SuperMemLogoProps) => {
  return (
    <div className={cn("flex items-center gap-2 h-10", className)}>
      <img
        src={logoSvg}
        alt=""
        className="h-full w-auto flex-shrink-0"
      />
      <span className="text-xl font-bold text-foreground whitespace-nowrap leading-none">
        SuperMem
      </span>
    </div>
  );
};

export default SuperMemLogo;
