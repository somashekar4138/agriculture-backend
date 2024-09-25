import { Module } from '@nestjs/common';
import { SoilService } from './soil.service';
import { SoilController } from './soil.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SoilController],
  providers: [SoilService, PrismaService],
})
export class SoilModule {}
