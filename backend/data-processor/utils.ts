import * as moment from 'moment';
import * as https from 'https';
import { Geocode } from './models/geocode/geocode.inteface';

export class Utils {

  static DATE_FORMAT = 'MM-DD-YYYY';
  static CSV_EXT = '.csv';
  static EMPTY_STR = '';

  private static NOMINATIM_URL = 'nominatim.openstreetmap.org';
  private static NOMINATIM_SEARCH = '/search';
  private static NOMINATIM_FORMAT = 'format=json';

  static fileNameToDate(value: string) {
    const strDate = value.replace(this.CSV_EXT, this.EMPTY_STR);
    return moment(strDate, this.DATE_FORMAT).utc().valueOf() + (moment().utcOffset() * 60 * 1000);
  };

  static toUTC(value: string) {
    return moment(value).utc().valueOf();
  }

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static geocode(value: Geocode): Promise<any> {

    let query = '';
    Object.keys(value).forEach((property) => {

      const param = value[property];
      if (param) {
        query += `${param.toString().trim()} `;
      }
    });

    query = `q=${encodeURIComponent(query)}&${this.NOMINATIM_FORMAT}`;

    const options = {
      hostname: this.NOMINATIM_URL,
      path: `${this.NOMINATIM_SEARCH}?${query}`,
      headers: {
        Referer: 'http://localhost',
        'User-Agent': 'COVID-19 GitHub leecher',
      }
    };

    return new Promise(async (resolve, reject) => {

      // Timeout to comply Nominatim rate of a request per second.
      await Utils.sleep(1100);

      https.get(options, (response) => {

        let payload = '';
        response.on('data', (chunk) => {
          payload += chunk;
        });

        response.on('end', () => {
          resolve({payload: JSON.parse(payload)});
        });

        response.on('error', (error) => {
          reject({error, msg: options.hostname + options.path});
        });
      });
      //resolve({payload: [1, 2]});
    });
  }
}

