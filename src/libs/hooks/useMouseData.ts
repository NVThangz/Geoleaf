import { useContext } from "react";
import { GeoContext } from "../providers/GeoProvider";

const useMouseData = () => {
  const { mouseData, clickData } = useContext(GeoContext);

  if (mouseData === undefined || clickData === undefined) {
    throw new Error("useMouseData must be used within a GeoProvider");
  }

  return { mouseData, clickData };
};

export { useMouseData };
