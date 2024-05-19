import { TileLayer } from "react-leaflet";

enum MapType {
  TileServerGL,
}

interface GeoCustomMapProps {
  mapType: MapType;
  endpoint: string;
  style: string;
}

const GeoCustomMap = ({ mapType, endpoint, style }: GeoCustomMapProps) => {
  let url = "";

  switch (mapType) {
    case MapType.TileServerGL:
      url = `http://${endpoint || "localhost:8081"}/styles/${
        style || "klokantech-basic"
      }/{z}/{x}/{y}.png`;
      break;
    default:
      break;
  }

  return <TileLayer url={url} />;
};

export { GeoCustomMap, MapType };
