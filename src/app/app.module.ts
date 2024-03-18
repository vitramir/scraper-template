import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FetchService } from './fetch.service';
import { MockSource } from 'src/scraper/mockSource';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [FetchService, MockSource],
})
export class AppModule {}
