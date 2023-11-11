import * as React from "react"

import { useEffect, useRef, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { cn } from "@/lib/utils";

export default function AutoCompleteSearch({ className, type, icon, ...props }: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showEmpty, setShowEmpty] = useState(true)
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
    if (value.length > 0) {
      setShowEmpty(true)
    }
  }, [value])

  const handleSelect =
    ({ description }: any) =>
      () => {
        // When the user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setShowEmpty(false)
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          console.log("📍 Coordinates: ", { lat, lng });
        });
      };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <CommandItem key={place_id} value={place_id} onSelect={handleSelect(suggestion)} className="justify-between">
          <span>{main_text}</span>
          <span className="truncate">{secondary_text}</span>
        </CommandItem>
      );
    });

  return (
    <div ref={ref}>
      <Command className={cn(className)} shouldFilter={false}>
        <CommandInput inputMode="search" className={"h-10"} value={value} ref={inputRef} onValueChange={(value) => setValue(value)} placeholder="Search for a fishing location..." />
        <CommandList>
          {showEmpty && value.length > 0 && data.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
          {status === "OK" && renderSuggestions()}
        </CommandList>
      </Command>
    </div>
  )
}
