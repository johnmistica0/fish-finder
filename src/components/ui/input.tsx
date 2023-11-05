import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-input bg-white dark:border-slate-800 dark:bg-slate-950 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          !!icon && "pl-3",
          className,
        )}
      >
        {icon}
        <input
          type={type}
          className={cn(
            "flex h-full w-full rounded-md bg-white text-sm px-3 focus-visible:outline-none bg-transparent",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>

    )
  }
)
Input.displayName = "Input"

export { Input }
