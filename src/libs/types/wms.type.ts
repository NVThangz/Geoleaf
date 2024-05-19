import { BaseRequestGeoApiType } from ".";
import { GeoServerException, InfoFormat, OutputFormat } from "../enums";

type GetMapGeoApiType = BaseRequestGeoApiType & {
  layers: string;
  styles: string;
  bBox: string;
  width: string;
  height: string;
  format: OutputFormat;
  transparent?: string;
  bgColor?: string;
  exceptions?: GeoServerException;
  time?: string;
  sld?: string;
  sld_body?: string;
  srs?: string;
};

type GetFeatureInfoApiType = BaseRequestGeoApiType & {
  layers: string;
  styles: string;
  bBox: string;
  width: string;
  height: string;
  query_layers: string;
  x: string;
  y: string;
  info_format?: InfoFormat;
  feature_count?: string;
  exceptions?: GeoServerException;
};

type DescribeLayerApiType = BaseRequestGeoApiType & {
  layers: string;
  exceptions?: GeoServerException;
};

type WmsRequestType = Partial<
  GetMapGeoApiType & GetFeatureInfoApiType & DescribeLayerApiType
>;

export type {
  GetMapGeoApiType,
  GetFeatureInfoApiType,
  DescribeLayerApiType,
  WmsRequestType,
};
