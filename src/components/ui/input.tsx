import * as React from "react";

import { cn } from "@/utils/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export interface InputWithShowProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onShow: () => void;
}

const InputWithShow = React.forwardRef<HTMLInputElement, InputWithShowProps>(
  ({ className, type, onShow, ...props }, ref) => {
    return (
      <div className="flex w-full items-center rounded-md border border-slate-200 bg-white px-3 py-2">
        <input
          type={type}
          className={cn(
            "flex w-full text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />

        <span
          className="text-xl w-2 h-2 bg-red-100 text-gray-400 hover:cursor-pointer hover:text-red-500"
          onClick={onShow}
        />
      </div>
    );
  },
);
InputWithShow.displayName = "InputWithShow";

export { Input, InputWithShow };
