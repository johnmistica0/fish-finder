import * as React from "react"

import { useEffect, useRef, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { useMapContext } from "./context/MapContext";
import { useRouter } from "next/navigation";
import getResults from "./api/autoComplete";

interface QueryResult {
  response: {
    features: {
      id: string
      center: number[]
      place_name: string
    }[]
  }
}

export default function AutoCompleteSearch({ className, type, icon, ...props }: any) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null);
  const [showEmpty, setShowEmpty] = useState(true)
  const [showX, setShowX] = useState(false)
  const [showCommandItems, setShowCommandItems] = useState(true)
  const [data, setData] = useState<QueryResult>()
  const [input, setInput] = useState('')
  const { setPosition, currentLocation } = useMapContext();

  const ref = useOnclickOutside(() => {
    setShowX(false)
    setShowEmpty(false)
    setShowCommandItems(false)
  });

  useEffect(() => {
    setShowX(input.length > 0)
    setShowEmpty(input.length > 0)
    setShowCommandItems(input.length > 0)
  }, [input])

  const handleSelect = ({ center, place_name }: any) =>
    () => {
      setPosition({ lat: center[1], lng: center[0] })
      setInput(place_name)
      setShowX(false)
      setShowEmpty(false)
      setShowCommandItems(false)
      setData(undefined)
      router.push('/explore')
    };

  const renderSuggestions = () =>
    data?.response.features.map((suggestion) => {
      const { id, place_name } = suggestion;

      return (
        <CommandItem key={id} value={place_name} onSelect={handleSelect(suggestion)} className="justify-between">
          <span>{place_name}</span>
        </CommandItem>
      );
    });

  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      setShowCommandItems(false)
      setInput('')
    }
  }

  async function sendQuery(query: string) {
    try {
      const queryResults: any = await getResults(query, currentLocation);
      setData(queryResults)
    } catch (e) {
      console.log(e)
    }
  }

  const handleInputChange = (value: any) => {
    sendQuery(value)
    setInput(value)
  }

  return (
    <div ref={ref}>
      <Command onKeyDown={handleKeyDown} className={cn(className)} shouldFilter={false}>
        <CommandInput inputMode="search" className={"h-10"} value={input} ref={inputRef} onValueChange={handleInputChange} placeholder="Search for a fishing location...">
          {showX && <XCircle className="mr-2 h-4 w-4 shrink-0 opacity-50 cursor-pointer" onClick={() => setInput('')} />}
        </CommandInput>
        {showCommandItems &&
          <CommandList>
            {showEmpty && data?.response.features.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
            {data !== undefined && renderSuggestions()}
          </CommandList>}
      </Command>
    </div>
  )
}
