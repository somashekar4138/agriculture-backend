import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  BlackSoilDto,
  CreateBlackSoilDto,
  CreateRedSoilDto,
  RedSoilDto,
} from 'shared/models';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SoilService {
  constructor(private prismaService: PrismaService) {}
  async createRedSoil(createSoilDto: CreateRedSoilDto) {
    const redSoil = await this.prismaService.redSoil.create({
      data: {
        address: createSoilDto.address,
        latitude: createSoilDto.latitude,
        longitude: createSoilDto.longitude,
        cereal: createSoilDto.cereal,
        groundnut: createSoilDto.groundnut,
        kagi: createSoilDto.kagi,
        pulse: createSoilDto.pulse,
        vegetable: createSoilDto.vegetable,
      },
    });

    return redSoil;
  }

  async createBlackSoil(createSoilDto: CreateBlackSoilDto) {
    const blackSoil = await this.prismaService.blackSoil.create({
      data: {
        address: createSoilDto.address,
        latitude: createSoilDto.latitude,
        longitude: createSoilDto.longitude,
        cotton: createSoilDto.cotton,
        maize: createSoilDto.maize,
        wheat: createSoilDto.wheat,
        rice: createSoilDto.rice,
        sugarcane: createSoilDto.sugarcane,
        sunflower: createSoilDto.sunflower,
      },
    });

    return blackSoil;
  }

  async getRedSoil({ latitude, longitude }) {
    const distanceInKm = 50;
    const earthRadiusInKm = 6371;

    const redSoil = (await this.prismaService.$queryRawUnsafe(`
       SELECT *
        FROM "RedSoil"
        WHERE (
            ${earthRadiusInKm} * ACOS(
                COS(RADIANS(${latitude})) * COS(RADIANS("latitude")) * 
                COS(RADIANS("longitude") - RADIANS(${longitude})) + 
                SIN(RADIANS(${latitude})) * SIN(RADIANS("latitude"))
            )
        ) < ${distanceInKm};
    `)) as RedSoilDto[];
    return redSoil?.map((soil) => plainToInstance(RedSoilDto, soil));
  }

  async getBlackSoil({ latitude, longitude }) {
    const distanceInKm = 50;
    const earthRadiusInKm = 6371;

    const blackSoil = (await this.prismaService.$queryRawUnsafe(`
       SELECT *
        FROM "BlackSoil"
        WHERE (
            ${earthRadiusInKm} * ACOS(
                COS(RADIANS(${latitude})) * COS(RADIANS("latitude")) * 
                COS(RADIANS("longitude") - RADIANS(${longitude})) + 
                SIN(RADIANS(${latitude})) * SIN(RADIANS("latitude"))
            )
        ) < ${distanceInKm};
    `)) as BlackSoilDto[];
    return blackSoil?.map((soil) => plainToInstance(BlackSoilDto, soil));
  }
}
