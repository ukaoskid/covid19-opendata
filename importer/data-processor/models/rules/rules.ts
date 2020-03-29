import { Rule } from './rules.interface';
import { TYPES } from '../types';

export const RULES: Rule[] = [
  {
    validUntil: 1583020799000,
    columns: {
      provinceState: { header: 'Province/State', type: TYPES.STRING },
      country: { header: 'Country/Region', type: TYPES.STRING, replace: [{ what: 'Mainland China', str: 'China'}] },
      lastUpdate: { header: 'Last Update', type: TYPES.DATETIME },
      confirmed: { header: 'Confirmed', type: TYPES.NUMBER },
      deaths: { header: 'Deaths', type: TYPES.NUMBER },
      recovered: { header: 'Recovered', type: TYPES.NUMBER },
      latitude: { header: '', type: TYPES.GEO },
      longitude: { header: '', type: TYPES.GEO },
    }
  },
  {
    validUntil: 1584835199000,
    columns: {
      provinceState: { header: 'Province/State', type: TYPES.STRING },
      country: { header: 'Country/Region', type: TYPES.STRING, replace: [{ what: 'Mainland China', str: 'China'}] },
      lastUpdate: { header: 'Last Update', type: TYPES.DATETIME },
      confirmed: { header: 'Confirmed', type: TYPES.NUMBER },
      deaths: { header: 'Deaths', type: TYPES.NUMBER },
      recovered: { header: 'Recovered', type: TYPES.NUMBER },
      latitude: { header: 'Latitude', type: TYPES.GEO },
      longitude: { header: 'Longitude', type: TYPES.GEO },
    }
  },
  {
    columns: {
      fips: { header: 'FIPS', type: TYPES.STRING },
      admin2: { header: 'Admin2', type: TYPES.STRING },
      provinceState: { header: 'Province_State', type: TYPES.STRING, replace: [{ what: 'Mainland China', str: 'China'}] },
      country: { header: 'Country_Region', type: TYPES.STRING },
      lastUpdate: { header: 'Last_Update', type: TYPES.DATETIME },
      confirmed: { header: 'Confirmed', type: TYPES.NUMBER },
      deaths: { header: 'Deaths', type: TYPES.NUMBER },
      recovered: { header: 'Recovered', type: TYPES.NUMBER },
      latitude: { header: 'Lat', type: TYPES.NUMBER },
      longitude: { header: 'Long_', type: TYPES.GEO },
      combinedKey: { header: 'Combined_Key', type: TYPES.GEO },
    }
  },
];