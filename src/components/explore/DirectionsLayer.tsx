import { useEffect, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Layer, Source } from 'react-map-gl';
import type { LineLayer } from 'react-map-gl';
import type { FeatureCollection } from 'geojson';
import { useAppSelector } from "@/app/hooks";
import { selectDirectionsData } from "./mapSlice";

export default function DirectionsLayer() {
  const directionsData = useAppSelector(selectDirectionsData)
  const [geoJson, setGeoJson] = useState<FeatureCollection | null>(null)

  const layerStyle: LineLayer = {
    id: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#0080FF',
      'line-width': 6
    }
  }

  useEffect(() => {
    if (directionsData !== null) {
      setGeoJson({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature', geometry: directionsData.routes[0].geometry, properties: {}
          }
        ]
      })
    } else {
      setGeoJson(null)
    }
  }, [directionsData])

  return (
    <>
      {geoJson && <Source id="my-data" type="geojson" data={geoJson}>
        <Layer {...layerStyle} />
      </Source>}
    </>
  );
}