import { Coordinates, DirectionsResponse } from "../explore/mapSlice";

const buildQuery = (profile: string, start: Coordinates, destination: Coordinates) => {
  const base_url = "https://api.mapbox.com/directions/v5/"
  const directions_url = `${base_url}${profile}/${start.lng},${start.lat};${destination.lng},${destination.lat}`
  const query_url = `${directions_url}?geometries=geojson&steps=true&banner_instructions=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
  return query_url
};

const getDirections = async function(start: Coordinates, destination: Coordinates): Promise<DirectionsResponse> {
  try {
    const path = buildQuery('mapbox/driving', start, destination);
    const testPath = await fetch(path, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!testPath.ok) throw Error(testPath.statusText);

    return await testPath.json()
  } catch (error) {
    return {
      message: 'Error occurred retrieving directions',
      routes: null!,
      waypoints: null!,
      code: null!,
      uuid: null!,
    };
  }
};

export default getDirections;