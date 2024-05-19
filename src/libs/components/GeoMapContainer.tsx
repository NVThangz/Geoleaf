import { useContext } from "react";
import { MapContainer, MapContainerProps, useMapEvents } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { GeoContext } from "../providers/GeoProvider";
import "leaflet/dist/leaflet.css";

interface GeoMapContainerProps extends MapContainerProps {
  children: React.ReactNode;
}

const GeoMapContainer = ({ children, ...props }: GeoMapContainerProps) => {
  const { setClickData, setMouseData } = useContext(GeoContext);

  function UpdateMouseData() {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        const map = e.target;

        const mouseData = {
          bBox: map.getBounds().toBBoxString(),
          width: map.getSize().x,
          height: map.getSize().y,
          x: map.layerPointToContainerPoint(e.layerPoint).x,
          y: map.layerPointToContainerPoint(e.layerPoint).y,
        };

        setClickData(mouseData);
      },
      mousemove(e: LeafletMouseEvent) {
        const map = e.target;

        const mouseData = {
          bBox: map.getBounds().toBBoxString(),
          width: map.getSize().x,
          height: map.getSize().y,
          x: map.layerPointToContainerPoint(e.layerPoint).x,
          y: map.layerPointToContainerPoint(e.layerPoint).y,
        };

        setMouseData(mouseData);
      },
    });

    return null;
  }

  return (
    <MapContainer {...props}>
      <UpdateMouseData />
      {children}
    </MapContainer>
  );
};

export { GeoMapContainer };
