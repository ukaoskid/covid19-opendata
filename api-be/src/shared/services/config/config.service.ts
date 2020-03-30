import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {

  public DB_AUTH: string;
  public DB_HOSTNAME: string;
  public DB_PORT: string;
  public DB_NAME: string;
  public DB_NAME_CONFIG: string;

  constructor() {

    this.DB_AUTH = process.env.DB_AUTH;
    this.DB_HOSTNAME = process.env.DB_HOSTNAME;
    this.DB_PORT = process.env.DB_PORT;
    this.DB_NAME = process.env.DB_NAME;
    this.DB_NAME_CONFIG = process.env.DB_NAME_CONFIG;
  }
}
