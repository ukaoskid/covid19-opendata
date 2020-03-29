import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CouchDbService } from '../shared/services/couch-db/couch-db.service';

@Controller('data')
export class DataController {

  constructor(private readonly couchDb: CouchDbService) {
  }

  @Post('find')
  public findData(@Res() res, @Body() body: any) {

    this.couchDb.getDocs(body).then((data) => {

      if (data.status !== 200) {
        res.status(HttpStatus.OK).send({ status: 'error' });
      } else {
        res.status(HttpStatus.OK).send({ status: 'ok', payload: data.data.docs});
      }
    }).catch((error: any) => {
      console.error('err', error);
      res.status(HttpStatus.OK).send({ status: 'error', payload: error });
    })
  }
}
