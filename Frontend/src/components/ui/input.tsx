import * as React from "react"

import { cn } from "@/lib/utils"
import { IconType } from "react-icons";

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}
//   import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: IconType;
  endIcon?: IconType;
  click?: () => void
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, click, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className="w-full relative">
        {StartIcon && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <StartIcon size={18} className="text-muted-foreground"  />
          </div>
        )}
      
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-potters-clay-50 dark:text-gray-500 text-gray-500 py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-8" : "",
            endIcon ? "pr-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <EndIcon className="text-muted-foreground "  onClick={click} />
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };