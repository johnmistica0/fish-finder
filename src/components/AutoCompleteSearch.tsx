import * as React from "react"

import { useEffect, useRef, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { useMapContext } from "./context/MapContext";
import { useRouter } from "next/navigation";

export default function AutoCompleteSearch({ className, type, icon, ...props }: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()
  const [showEmpty, setShowEmpty] = useState(true)
  const [showX, setShowX] = useState(false)
  const [showCommandItems, setShowCommandItems] = useState(true)
  const {setPosition} = useMapContext();
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete(
    {
      callbackName: "YOUR_CALLBACK_NAME",
      requestOptions: {
        /* Define search scope here */
      },
      debounce: 300,
    }
  )

  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    setShowEmpty(false)
    clearSuggestions();
  });

  useEffect(() => {
    setShowX(value.length > 0)
    setShowEmpty(value.length > 0)
    setShowCommandItems(value.length > 0)
  }, [value])

  const handleSelect = ({ description }: any) =>
      () => {
        // When the user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          setPosition({ lat, lng })
          setShowX(false)
          setShowEmpty(false)
          router.push('/explore')
        });
      };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <CommandItem key={place_id} value={place_id} 
          onSelect={() => {
            setShowCommandItems(false)
            handleSelect(suggestion)}
          } 
          className="justify-between">
          <span>{main_text}</span>
          <span className="truncate">{secondary_text}</span>
        </CommandItem>
      );
    });
  
  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      setShowCommandItems(false)
      setValue('')
    }
  }

  return (
    <div ref={ref}>
      <Command onKeyDown={handleKeyDown} className={cn(className)} shouldFilter={false}>
        <CommandInput inputMode="search" className={"h-10"} value={value} ref={inputRef} onValueChange={(value) => setValue(value)} placeholder="Search for a fishing location...">
          {showX && <XCircle className="mr-2 h-4 w-4 shrink-0 opacity-50 cursor-pointer" onClick={() => setValue('')}/>}
        </CommandInput>
        {showCommandItems && 
        <CommandList>
          {showEmpty && data.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
          {status === "OK" && renderSuggestions()}
        </CommandList>}
      </Command>
    </div>
  )
}
