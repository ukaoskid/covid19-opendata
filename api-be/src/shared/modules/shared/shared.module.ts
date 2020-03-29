import { Module, HttpModule } from '@nestjs/common';
import { CouchDbService } from '../../services/couch-db/couch-db.service';
import { ConfigService } from '../../services/config/config.service';

@Module({
  imports: [HttpModule],
  providers: [
    CouchDbService,
    ConfigService,
  ],
  exports: [
    CouchDbService,
    ConfigService,
  ],
})
export class SharedModule {
}
