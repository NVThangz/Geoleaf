import { BaseRequestGeoApiType } from ".";

type DescribeCoverageApiType = BaseRequestGeoApiType;

type GetCoverageApiType = BaseRequestGeoApiType;

type WcsRequestType = Partial<DescribeCoverageApiType & GetCoverageApiType>;

export type { DescribeCoverageApiType, GetCoverageApiType, WcsRequestType };
