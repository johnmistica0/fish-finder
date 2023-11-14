"use client"

import 'mapbox-gl/dist/mapbox-gl.css';
import MapContainer from "@/components/explore/MapContainer";
import CatchFeed from '@/components/explore/CatchFeed';

export default function Home() {

  return (
    <main className="grid grid-cols-4 h-[calc(100vh-64px)]">
      <div className="col-span-1">
        <CatchFeed />
      </div>
      <div className="col-span-3 relative">
        <MapContainer />
      </div>
    </main>
  );
}
