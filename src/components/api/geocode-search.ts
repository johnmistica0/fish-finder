import { Coordinates } from "../context/MapContext.types";

const buildQuery = (query: string, location: Coordinates) => {
  const base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
  const with_bias = `${base_url}${query}.json?country=US&proximity=${location.lng},${location.lat}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
  const without_bias = `${base_url}${query}.json?country=US&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
  return location !== null ? with_bias : without_bias
};

const getResults = async function(query: string, location: Coordinates) {
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