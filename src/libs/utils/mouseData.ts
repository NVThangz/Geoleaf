import { LeafletMouseEvent } from "leaflet";
import { MouseDataType } from "../types";

const getMouseData = (e: LeafletMouseEvent): MouseDataType => {
  const map = e.target;

  const bBox = map.getBounds().toBBoxString();
  const width = map.getSize().x;
  const height = map.getSize().y;
  const x = map.layerPointToContainerPoint(e.layerPoint).x;
  const y = map.layerPointToContainerPoint(e.layerPoint).y;
  return { bBox, width, height, x, y };
};

export { getMouseData };
