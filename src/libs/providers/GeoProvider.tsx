import { createContext, useEffect, useState } from "react";
import { GeoApiBuilder } from "../api/GeoApiBuilder";
import { GeoService } from "../enums";
import { MouseDataType } from "../types";

type GeoContextType = Record<string, unknown>;

type GeoRequestType = {
  request: string;
  isMutable: boolean;
};

const GeoContext = createContext<{
  responses: GeoContextType;
  setResponses: React.Dispatch<React.SetStateAction<GeoContextType>>;
  requests: Set<GeoRequestType>;
  updateRequests: (request: string, isMutable?: boolean) => void;
  mouseData: MouseDataType | null;
  setMouseData: React.Dispatch<React.SetStateAction<MouseDataType | null>>;
  clickData: MouseDataType | null;
  setClickData: React.Dispatch<React.SetStateAction<MouseDataType | null>>;
}>({
  responses: {},
  setResponses: () => {},
  requests: new Set(),
  updateRequests: () => {},
  mouseData: null,
  setMouseData: () => {},
  clickData: null,
  setClickData: () => {},
});

type GeoProviderProps = {
  baseUri: string;
  children: React.ReactNode;
};

const GeoProvider: React.FC<GeoProviderProps> = ({
  baseUri,
  children,
}: GeoProviderProps) => {
  const [responses, setResponses] = useState<GeoContextType>({});
  const [requests, setRequests] = useState<Set<GeoRequestType>>(new Set());

  const [mouseData, setMouseData] = useState<MouseDataType | null>(null);
  const [clickData, setClickData] = useState<MouseDataType | null>(null);

  const updateRequests = (request: string, isMutable = false) => {
    setRequests((prev) => new Set(prev.add({ request, isMutable })));
  };

  useEffect(() => {
    const geoApiBuilder = new GeoApiBuilder(baseUri);

    // requests.forEach((request, i) => {
    //   const service = request.split("service=")[1].slice(0, 3) as GeoService;

    //   rawRequests.push({
    //     request: geoApiBuilder.getRawUrl(service, request),
    //     index: i,
    //   });
    // });

    const filteredRequests = Array.from(requests).filter(
      (request) => request.isMutable || !responses[request.request]
    );

    if (filteredRequests.length === 0) return;

    const fetchGeo = async () => {
      const fetchUris = filteredRequests.map((requests) => {
        const service = requests.request
          .split("service=")[1]
          .slice(0, 3) as GeoService;

        return geoApiBuilder.getRawUrl(service, requests.request);
      });

      const promises = fetchUris.map((key) =>
        fetch(key).then((res) => res.json())
      );

      const data = await Promise.all(promises);

      const geoData: GeoContextType = { ...responses };

      data.forEach((d, i) => {
        geoData[filteredRequests[i].request] = d;
      });

      setResponses(geoData);
    };

    fetchGeo();
  }, [baseUri, requests]);

  return (
    <GeoContext.Provider
      value={{
        responses,
        setResponses,
        requests,
        updateRequests,
        mouseData,
        setMouseData,
        clickData,
        setClickData,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
};

export { GeoProvider, GeoContext };
