import * as http from 'http';
import { DbDocument } from './models/database/db-document.interface';

export class Database {

  private DATABASE = {
    hostname: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    db: process.env.DB_NAME,
    auth: process.env.DB_AUTH,
  };
  private BULK_DOCS = `${this.DATABASE.db}/_bulk_docs`;

  insert(payload: DbDocument): Promise<any> {

    const data = JSON.stringify(payload);
    const options = this.getOptions(this.BULK_DOCS, 'POST', data);

    return this.httpClient(options, data);
  }

  async prepareDb() {

    try {

      const deletion: any = await this.deleteDb();
      if (deletion.response !== 200) {
        return { error: 'Error during DB deletion.', statusCode: deletion.response }
      }

      const creation: any = await this.createDb();
      if (creation.response !== 201) {
        return { error: 'Error during DB creation.', statusCode: deletion.creation }
      }

      return { ok: true }

    } catch (error) {
      return { error: 'Unknown error during DB preparation', msg: error }
    }
  }

  private deleteDb() {

    const options = this.getOptions(this.DATABASE.db, 'DELETE');
    return this.httpClient(options, '');
  }

  private createDb() {

    const options = this.getOptions(this.DATABASE.db, 'PUT');
    return this.httpClient(options, '');
  }

  private getOptions(path: string, method: string, payload?: any) {

    let options = {
      hostname: this.DATABASE.hostname,
      port: this.DATABASE.port,
      path: `/${path}`,
      method: method,
      headers: {
        Authorization: this.DATABASE.auth,
        'Content-type': 'application/json',
      }
    };

    if (payload) {
      options.headers['Content-Length'] = Buffer.byteLength(payload);
    }

    return options;
  }

  private httpClient(options: any, data: string) {

    return new Promise((resolve, reject) => {

      let response;
      const request = http.request(options, (res) => {
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