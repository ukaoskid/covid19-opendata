import * as http from 'http';
import { DbDocument } from './models/database/db-document.interface';

export class Database {

  private DATABASE = {
    hostname: '134.122.85.104',
    port: 31664,
    db: '/covid19-opendata',
    auth: 'Basic YWRtaW46RFdLNXZ1Rkd4MFQw' // env.
  };

  insert(payload: DbDocument): Promise<any> {

    const data = JSON.stringify(payload);
    const optsBulkDocs = {
      hostname: this.DATABASE.hostname,
      port: this.DATABASE.port,
      path: `${this.DATABASE.db}/_bulk_docs`,
      method: 'POST',
      headers: {
        Authorization: this.DATABASE.auth,
        'Content-type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    return new Promise((resolve, reject) => {

      let response;
      const request = http.request(optsBulkDocs, (res) => {
        response = res.statusCode;
        resolve({ response });
      });

      request.on('error', (error) => {
        reject({ response, error });
      });

      request.write(data);
      request.end();
    });
  }
}