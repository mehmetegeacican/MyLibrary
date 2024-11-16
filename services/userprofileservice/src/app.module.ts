import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserprofilesModule } from './userprofiles/userprofiles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
          type:'postgres',
          host:configService.get('PGHOST'),
          port: + configService.get('PGPORT'),
          username: configService.get('PGUSER'),
          password: configService.get('PGPASSWORD'),
          database: configService.get('PGDATABASE'),
          entities: [],
          // synchronize is used for migration
          //synchronize:true
      })
    }),
    UserprofilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
