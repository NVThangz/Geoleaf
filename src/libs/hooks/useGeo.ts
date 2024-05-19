import { useContext } from "react";
import { GeoContext } from "../providers/GeoProvider";

const useGeo = () => {
  const { responses, requests } = useContext(GeoContext);

  if (responses === undefined || requests === undefined) {
    throw new Error("useGeo must be used within a GeoProvider");
  }

  return { responses, requests };
};

export { useGeo };
