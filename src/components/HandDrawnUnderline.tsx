import { ReactNode } from "react";

interface HandDrawnUnderlineProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

const HandDrawnUnderline = ({ children, color = "hsl(var(--accent))", className = "" }: HandDrawnUnderlineProps) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        className="absolute -bottom-1 left-0 w-full"
        viewBox="0 0 200 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ height: "6px" }}
      >
        <path
          d="M2 5.5C30 2.5 60 3 90 4.5C120 6 150 3.5 198 5"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.7 }}
        />
      </svg>
    </span>
  );
};

export default HandDrawnUnderline;
