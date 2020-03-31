export class CouchDbDto {

  selector: any;
  limit: number;

  constructor(filter: any, limit = 99999) {
    this.selector = filter.selector;
    this.limit = limit;
  }
}