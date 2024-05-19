import { GeoJSON, GeoJSONProps } from "react-leaflet";
import { useContext, useEffect } from "react";
import { GeoRequestType } from "../types";
import { GeoContext } from "../providers/GeoProvider";

interface GeoMutableLayerProps extends Partial<GeoJSONProps> {
  request: GeoRequestType;
}

const GeoMutableLayer: React.FC<GeoMutableLayerProps> = ({
  request,
  ...props
}) => {
  const { responses, updateRequests } = useContext(GeoContext);

  const query = new URLSearchParams(request).toString();

  useEffect(() => {
    updateRequests(query, true);
  }, []);

  const data = responses[query];

  if (data) {
    return (
      <GeoJSON
        {...props}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={responses[query] as any}
      />
    );
  } else {
    return null;
  }
};

export { GeoMutableLayer };
