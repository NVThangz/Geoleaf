import "leaflet/dist/leaflet.css";
import { useRef, useState } from "react";
import { LayersControl } from "react-leaflet";
import { GeoCustomMap, MapType, useMouseData } from "./libs";
import { GeoLayer } from "./libs/components/GeoLayer";
import { GeoMapContainer } from "./libs/components/GeoMapContainer";
import { GeoOpenStreetMap } from "./libs/components/GeoOpenStreetMap";
import { GeoService, GeoVersion, InfoFormat, WfsRequest } from "./libs/enums";

const App = () => {
  const [search, setSearch] = useState<string>("");

  const [useLocalMap, setUseLocalMap] = useState<boolean>(false);

  const useLocalRef = useRef(null);

  const searchRef = useRef(null);

  const { mouseData } = useMouseData();

  return (
    <div className="flex flex-col h-screen w-screen bg-neutral-950">
      <div className="relative flex flex-col justify-around items-center w-full h-20 bg-slate-50">
        <div className="flex gap-4">
          <label>Tỉnh</label>
          <input
            type="text"
            className="flex-1 cursor-text w-20 z-[1000]"
            ref={searchRef}
          />
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          <label>Use Local Map</label>
          <input type="checkbox" ref={useLocalRef} />
        </div>
        <button
          className="bg-blue-500 text-white w-20 flex items-center justify-center"
          onClick={() => {
            setSearch(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              searchRef.current ? (searchRef.current as any).value : ""
            );
            setUseLocalMap(
              useLocalRef.current
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (useLocalRef.current as any).checked
                : true
            );
          }}
        >
          Search
        </button>
      </div>
      <GeoMapContainer center={[14.0583, 108.2772]} zoom={5} className="">
        {useLocalMap ? (
          <GeoCustomMap
            mapType={MapType.TileServerGL}
            endpoint={"localhost:8081"}
            style={"klokantech-basic"}
          />
        ) : (
          <GeoOpenStreetMap />
        )}
        <LayersControl>
          <LayersControl.Overlay name="Provinces" checked={true}>
            <GeoLayer
              request={{
                service: GeoService.WFS,
                version: GeoVersion.V2_0_0,
                request: WfsRequest.GET_FEATURE,
                typeNames: "vietnam:diaphantinh",
                outputFormat: InfoFormat.JSON,
              }}
              key={search}
              filter={(feature) => {
                console.log("feature", feature);
                return (feature.properties.ten_tinh as string)
                  .toLowerCase()
                  .includes(search.toLowerCase());
              }}
              onEachFeature={(feature, layer) => {
                layer.on("mouseover", (e) => {
                  e.target.setStyle({
                    color: "red",
                    weight: 5,
                    opacity: 0.65,
                  });
                  e.target.bindPopup(feature.properties.ten_tinh);
                });
                layer.on("mouseout", (e) => {
                  e.target.setStyle({
                    color: "blue",
                    weight: 5,
                    opacity: 0.65,
                  });
                });
              }}
            />
          </LayersControl.Overlay>
        </LayersControl>
        <div className="absolute bottom-4 left-4 bg-white p-2 z-[1000]">
          {mouseData && (
            <>
              <div>Mouse Data</div>
              <div className="w-20">
                <span>x: {mouseData.x}</span>
                <br />
                <span>y: {mouseData.y}</span>
                <br />
                <span>height: {mouseData.height}</span>
                <br />
                <span>width: {mouseData.width}</span>
                <br />
                <span>
                  bBox:{" "}
                  {mouseData.bBox
                    .split(",")
                    .map((coord) => parseFloat(coord).toFixed(1))
                    .join("\n")}
                </span>
              </div>
            </>
          )}
        </div>
      </GeoMapContainer>
    </div>
  );
};

export default App;
