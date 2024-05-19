enum WfsRequest {
  // Generates a metadata document describing a WFS service provided by server as well as valid WFS operations and parameters
  GET_CAPABILITIES = "GetCapabilities",
  // Returns a description of feature types supported by a WFS service
  DESCRIBE_FEATURE_TYPE = "DescribeFeatureType",
  // Returns a selection of features from a data source including geometry and attribute values
  GET_FEATURE = "GetFeature",
  // Prevents a feature from being edited through a persistent feature lock
  LOCK_FEATURE = "LockFeature",
  // Edits existing feature types by creating, updating, and deleting
  TRANSACTION = "Transaction",
}

export { WfsRequest };
