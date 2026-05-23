import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/entities/note.entity';
import { AuthMiddleware } from 'common/middleware/auth.middleware';
import { AnnotationsModule } from './annotations/annotations.module';
import { Annotation } from './annotations/entities/annotation.entity';

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
          entities: [Note,Annotation],
          // synchronize is used for migration
          //synchronize:true
      })
    }),
    NotesModule,
    AnnotationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api/v2/notes')
  }
}
