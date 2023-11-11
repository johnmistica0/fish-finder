import * as React from "react"

import { cn } from "@/lib/utils"
import { XCircle } from "lucide-react";
import { Button } from "./button";
import { useRef, useState } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState<string>('')


    const handleInput = (e: any) => {
      e.preventDefault
      setInput(e.target.value)
    }

    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-input bg-white dark:border-slate-800 dark:bg-slate-950 text-sm focus:outline-none",
          !!icon && "pl-3",
          className,
        )}
      >
        {icon}
        <input
          ref={inputRef}
          onChange={handleInput}
          type={type}
          value={input}
          className={cn(
            "focus:outline-none dark:placeholder-slate-300 flex h-full w-full rounded-md bg-white text-sm px-3 focus-visible:outline-none bg-transparent",
            className
          )}
          {...props}
        />
        {input.length > 0 && 
        <Button variant="ghost" size="icon" className="hover:bg-transparent dark:hover:bg-transparent" onClick={() => {setInput('')}}>
          <XCircle className="dark:stroke-slate-300 h-4 w-4 mr-2"/>
        </Button>}
      </div>

    )
  }
)
Input.displayName = "Input"

export { Input }
