export class CouchDbDto {

  selector: any;
  limit: number;

  constructor(selector: any, limit = 99999) {
    this.selector = selector;
    this.limit = limit;
  }
}