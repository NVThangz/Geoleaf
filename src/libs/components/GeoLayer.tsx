import { GeoJSON, GeoJSONProps } from "react-leaflet";
import { useContext, useEffect } from "react";
import { GeoRequestType } from "../types";
import { GeoContext } from "../providers/GeoProvider";

interface GeoLayerProps extends Partial<GeoJSONProps> {
  request: GeoRequestType;
}

const GeoLayer: React.FC<GeoLayerProps> = ({ request, ...props }) => {
  const { responses, updateRequests } = useContext(GeoContext);

  const query = new URLSearchParams(request).toString();

  useEffect(() => {
    updateRequests(query);
  }, []);

  const data = responses[query];

  if (data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <GeoJSON {...props} data={data as any} />;
  } else {
    return null;
  }
};

export { GeoLayer };
