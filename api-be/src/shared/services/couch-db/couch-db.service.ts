import { HttpService, Injectable } from '@nestjs/common';
import { CouchDbDto } from '../../models/couch-db.dto';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CouchDbService {

  private FIND_COMMAND = '_find';
  private CONFIG = 'config';

  constructor(private readonly http: HttpService,
              private readonly config: ConfigService) {
  }

  getDocs(selector: any) {

    const url = `http://${this.config.DB_HOSTNAME}:${this.config.DB_PORT}/${this.config.DB_NAME}/${this.FIND_COMMAND}`;
    const data = new CouchDbDto(selector);
    return this.http.post(url, data, { headers: this.buildHeaders() }).toPromise();
  }

  getConfig() {
    const url = `http://${this.config.DB_HOSTNAME}:${this.config.DB_PORT}/${this.config.DB_NAME_CONFIG}/${this.CONFIG}`;
    return this.http.get(url, { headers: this.buildHeaders() }).toPromise();
  }

  private buildHeaders() {
    return {
      Authorization: this.config.DB_AUTH,
      'Content-Type': 'application/json',
    }
  }
}
