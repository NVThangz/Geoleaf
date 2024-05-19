import { BaseRequestGeoApiType } from ".";
import { GeoServerException, InfoFormat } from "../enums";

type DescribeFeatureTypeApiType = BaseRequestGeoApiType & {
  typeNames: string;
  exceptions?: GeoServerException;
  outputFormat?: InfoFormat;
};

type GetFeatureApiType = BaseRequestGeoApiType & {
  typeNames: string;
  exceptions?: GeoServerException;
  outputFormat?: InfoFormat;
};

type WfsRequestType = Partial<DescribeFeatureTypeApiType & GetFeatureApiType>;

export type { DescribeFeatureTypeApiType, GetFeatureApiType, WfsRequestType };
