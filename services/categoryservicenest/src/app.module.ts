import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/entities/category.entity';

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
          entities: [Category],
          // synchronize is used for migration
          //synchronize:true
      })
    }),
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
