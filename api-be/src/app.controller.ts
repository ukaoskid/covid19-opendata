import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { CouchDbService } from './shared/services/couch-db/couch-db.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('config')
@Controller()
export class AppController {

  constructor(private readonly couchDb: CouchDbService) {}

  @ApiOperation({ summary: 'Hello world test.' })
  @Get()
  hello() {
    return { status: 'ok', payload: `COVID-19 API, hello! It's ${Date.now()}, have a nice day :)` }
  }

  @ApiOperation({ summary: 'Returns the current database version and last update UNIX date time.' })
  @Get('config')
  getConfig(@Res() res) {

    this.couchDb.getConfig().then((data) => {

      if (data.status !== 200) {
        res.status(HttpStatus.OK).send({ status: 'error' });
      } else {

        const payload = {
          version: data.data.version,
          datetime: data.data.datetime
        };
        res.status(HttpStatus.OK).send({ status: 'ok', payload });
      }
    }).catch((error: any) => {
      res.status(HttpStatus.OK).send({ status: 'error', payload: error });
    })
  }
}
