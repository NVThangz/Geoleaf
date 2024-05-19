enum WcsRequest {
  // Retrieves a list of the server’s data, as well as valid WCS operations and parameters
  GET_CAPABILITIES = "GetCapabilities",
  // Retrieves an XML document that fully describes the request coverages.
  GET_COVERAGE = "GetCoverage",
  // Returns a coverage in a well-known format. Like a WMS GetMap request, but with several extensions to support the retrieval of coverages.
  DESCRIBE_COVERAGE = "DescribeCoverage",
}

export { WcsRequest };
