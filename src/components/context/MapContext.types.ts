import { RefObject } from "react";
import { MapRef } from "react-map-gl";

export interface MapContextType {
  mapRef: RefObject<MapRef>;
}
