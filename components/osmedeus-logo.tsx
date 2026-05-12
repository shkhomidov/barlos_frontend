import * as React from "react";
import { cn } from "@/lib/utils";

type OsmedeusLogoProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function OsmedeusLogo({
  size = 200,
  className,
  ...props
}: OsmedeusLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn(
        "[&_.logo-stroke]:stroke-[#1A7F4B] dark:[&_.logo-stroke]:stroke-[#3DD68C]",
        "[&_.logo-fill]:fill-white dark:[&_.logo-fill]:fill-[#0D1117]",
        "[&_.logo-accent]:fill-[#1A7F4B] dark:[&_.logo-accent]:fill-[#3DD68C]",
        className,
      )}
      {...props}
    >
      <circle cx="50" cy="30" r="14" className="logo-stroke" strokeWidth={2} fill="none" opacity={0}>
        <animate attributeName="r" values="14;35" dur="3s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="3s" begin="0s" repeatCount="indefinite" />
      </circle>
      <circle cx="70" cy="65" r="14" className="logo-stroke" strokeWidth={2} fill="none" opacity={0}>
        <animate attributeName="r" values="14;35" dur="3s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="3s" begin="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="30" cy="65" r="14" className="logo-stroke" strokeWidth={2} fill="none" opacity={0}>
        <animate attributeName="r" values="14;35" dur="3s" begin="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="3s" begin="2s" repeatCount="indefinite" />
      </circle>
      <g strokeWidth={3.5}>
        <circle cx="50" cy="30" r="14" className="logo-stroke logo-fill" />
        <circle cx="70" cy="65" r="14" className="logo-stroke logo-fill" />
        <circle cx="30" cy="65" r="14" className="logo-stroke logo-fill" />
      </g>
      <rect x="47" y="52" width="6" height="6" className="logo-accent" transform="rotate(45 50 55)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}
