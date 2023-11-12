import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function CatchFeed() {

  return (
    <div className="flex flex-row justify-between items-center">
      <p className="text-lg font-semibold">Catches Near You</p>
      <Button variant="ghost" size="icon">
        <X />
      </Button>
    </div>
  );
}
