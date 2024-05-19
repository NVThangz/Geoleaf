import { WfsRequestType, WmsRequestType } from ".";
import {
  GeoService,
  GeoVersion,
  WcsRequest,
  WfsRequest,
  WmsRequest,
} from "../enums";
import { WcsRequestType } from "./wcs.type";

type GeoRequest = WmsRequest | WfsRequest | WcsRequest;

type GeoRequestType = BaseRequestGeoApiType &
  (WmsRequestType | WfsRequestType | WcsRequestType);

type BaseRequestGeoApiType = {
  service: GeoService;
  version: GeoVersion;
  request: GeoRequest;
};

type GetCapabilitiesRequest = BaseRequestGeoApiType;

export type {
  BaseRequestGeoApiType,
  GetCapabilitiesRequest,
  GeoRequest,
  GeoRequestType,
};
