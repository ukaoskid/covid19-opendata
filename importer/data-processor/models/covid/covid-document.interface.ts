export interface CovidDocument {

  provinceState: string;
  country: string;
  lastUpdate: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  issueDatetime: number;
  latitude?: number;
  longitude?: number;
  combinedKey?: string;
  fips?: string;
  admin2?: string;
}