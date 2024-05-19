const WMS_REQUESTS: Record<string, string> = {
  // Retrieves metadata about the service, including supported operations and parameters, and a list of the available layers
  GET_CAPABILITIES: "GetCapabilities",
  // Retrieves a map image for a specified area and content
  GET_MAP: "GetMap",
  // Retrieves the underlying data, including geometry and attribute values, for a pixel location on a map
  GET_FEATURE_INFO: "GetFeatureInfo",
  // Indicates the WFS or WCS to retrieve additional information about the layer.
  DESCRIBE_LAYER: "DescribeLayer",
  // Retrieves a generated legend for a map
  GET_LEGEND_GRAPHIC: "GetLegendGraphic",
};

export { WMS_REQUESTS };
