enum GeoService {
  // The Web Map Service (WMS) supports requests for map images (and other formats) generated from geographical data.
  WMS = "wms",
  // The Web Feature Service (WFS) supports requests for geographical feature data (with vector geometry and attributes).
  WFS = "wfs",
  //The Web Coverage Service (WCS) supports requests for coverage data (rasters).
  WCS = "wcs",
}

export { GeoService };
