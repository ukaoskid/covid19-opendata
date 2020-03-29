import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/modules/shared/shared.module';
import { DataController } from './data/data.controller';

@Module({
  imports: [SharedModule],
  controllers: [AppController, DataController],
  providers: [AppService],
})
export class AppModule {}
