import { Coordinates } from "../explore/mapSlice";

const buildQuery = (query: string, location: Coordinates | null) => {
  const base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
  return location !== null ? `${base_url}${query}.json?country=US&proximity=${location.lng},${location.lat}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}` : `${base_url}${query}.json?country=US&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
};

const getResults = async function(query: string, location: Coordinates | null) {
  if (query === "") {
    return {
      response: {
        features: []
      }
    };
  }

  try {
    const path = buildQuery(query, location);
    const testPath = await fetch(path, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!testPath.ok) throw Error(testPath.statusText);

    const queryResults = await testPath.json();
    return {
      response: queryResults
    };
  } catch (error) {
    return { error };
  }
};

export default getResults;