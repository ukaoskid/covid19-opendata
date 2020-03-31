import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FindCovid } from '../../models/find-covid.interface';

@Injectable({
  providedIn: 'root'
})
export class Covid19DataService {

  constructor(private http: HttpClient) { }

  findData(payload: FindCovid) {
    return this.http.post(`${environment.covidBackend}/data/find`, payload).toPromise();
  }

  getConfig() {
    return this.http.get(`${environment.covidBackend}/config`).toPromise();
  }
}
