import {
  GeoService,
  GeoVersion,
  WcsRequest,
  WfsRequest,
  WmsRequest,
} from "../enums";
import { GeoRequestType, WfsRequestType, WmsRequestType } from "../types";
import { WcsRequestType } from "../types/wcs.type";

class GeoApiBuilder {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getRawUrl(service: GeoService, rawQuery: string) {
    return `${this.baseUrl}/${service}?${rawQuery}`;
  }

  getUrl(service: GeoService, data: GeoRequestType) {
    const searchQuery = new URLSearchParams(data);

    return `${this.baseUrl}/${service}?${searchQuery}`;
  }

  getWmsUrl(version: GeoVersion, request: WmsRequest, data: WmsRequestType) {
    const searchQuery = new URLSearchParams(data);

    const wmsUrl = `${this.baseUrl}/wms?service=WMS&version=${version}&request=${request}&${searchQuery}`;

    return wmsUrl;
  }

  getWfsUrl(version: GeoVersion, request: WfsRequest, data: WfsRequestType) {
    const searchQuery = new URLSearchParams(data);

    const wfsUrl = `${this.baseUrl}/wfs?service=WFS&version=${version}&request=${request}&${searchQuery}`;

    return wfsUrl;
  }

  getWcsUrl(version: GeoVersion, request: WcsRequest, data: WcsRequestType) {
    const searchQuery = new URLSearchParams(data);

    const wcsUrl = `${this.baseUrl}/wcs?service=WCS&version=${version}&request=${request}&${searchQuery}`;

    return wcsUrl;
  }
}

export { GeoApiBuilder };
