import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';

import * as dotenv from 'dotenv';
import * as process from 'process';

import { SkillEntity } from './skill/entities/skill.entity';
import { CvEntity } from './cv/entities/cv.entity';
import { UserEntity } from './user/entities/user.entity';

dotenv.config();
@Module({
  imports: [
    CvModule,
    SkillModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [
        'dist/**/*.entity{.ts,.js}',
        CvEntity,
        SkillEntity,
        UserEntity,
      ],
      synchronize: true,
    }),
    CvModule,
    UserModule,
    SkillModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
