"use client"

import 'mapbox-gl/dist/mapbox-gl.css';
import MapContainer from "@/components/explore/MapContainer";
import CatchFeed from '@/components/explore/CatchFeed';
import { useRef, useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState(true)
  const mapContainerRef = useRef(null);

  return (
    <main className="flex flex-row h-[calc(100vh-64px)]">
      <div className={`${open ? 'w-1/4 2xl:w-1/6' : 'w-14'} transition-size duration-300 ease-in-out`}>
        <CatchFeed open={open} setOpen={setOpen}/>
      </div>
      <div ref={mapContainerRef} className={`${open ? 'w-3/4 2xl:w-5/6' : 'w-full'} transition-size duration-300 ease-in-out relative bg-slate-50 dark:bg-slate-950`}>
        <MapContainer mapContainerRef={mapContainerRef}/>
      </div>
    </main>
  );
}
