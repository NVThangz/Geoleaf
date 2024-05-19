import { TileLayer } from "react-leaflet";

const PUBLIC_MAP = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

interface GeoOpenStreetMapProps {
  customUrl?: string;
}

const GeoOpenStreetMap = ({ customUrl }: GeoOpenStreetMapProps) => {
  return <TileLayer url={customUrl ? customUrl : PUBLIC_MAP} />;
};

export { GeoOpenStreetMap };
