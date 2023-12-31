import * as React from "react"

import { useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandSeparator } from "../ui/command";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import getResults from "../api/geocode-search";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectUserLocation, setMapPosition } from "../explore/mapSlice";

interface QueryResult {
  response: {
    features: {
      id: string
      center: number[]
      place_name: string
    }[]
  }
}

export default function GeocodeSearchBar({ className }: any) {
  const router = useRouter()
  const [showEmpty, setShowEmpty] = useState(true)
  const [showX, setShowX] = useState(false)
  const [showCommandItems, setShowCommandItems] = useState(true)
  const [data, setData] = useState<QueryResult>()
  const [input, setInput] = useState('')
  const userLocation = useAppSelector(selectUserLocation)
  const dispatch = useAppDispatch()

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
      dispatch(setMapPosition({ lat: center[1], lng: center[0] }))
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
        <>
          <CommandSeparator alwaysRender={true} />
          <CommandItem key={id} value={place_name} onSelect={handleSelect(suggestion)} className="justify-between">
            <span>{place_name}</span>
          </CommandItem>
        </>
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
      const queryResults: any = await getResults(query, userLocation);
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
        <CommandInput inputMode="search" className={"h-10 flex flex-row justify"} value={input} onValueChange={handleInputChange} placeholder="Search for a fishing location...">
          {showX && <XCircle className="ml-2 mr-2 h-4 w-4 shrink-0 opacity-50 cursor-pointer" onClick={() => setInput('')} />}
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
