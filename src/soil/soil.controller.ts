import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SoilService } from './soil.service';
import {
  BlackSoilDto,
  CreateBlackSoilDto,
  CreateRedSoilDto,
  RedSoilDto,
} from 'shared/models';
import { ApiSuccessResponse } from 'shared/decorator/api-success-response.decorator';
import { SuccessResponseDto } from 'shared/dto/success-response.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'shared/decorator/public.decorator';

@ApiTags('soil')
@Controller('soil')
@ApiExtraModels(RedSoilDto, BlackSoilDto, SuccessResponseDto)
export class SoilController {
  constructor(private readonly soilService: SoilService) {}

  @Post('red')
  @ApiSuccessResponse(RedSoilDto)
  async createRedSoil(
    @Body() createSoilDto: CreateRedSoilDto,
  ): Promise<SuccessResponseDto<RedSoilDto>> {
    const result = await this.soilService.createRedSoil(createSoilDto);
    return {
      message: 'Soil created successfully',
      result,
    };
  }

  @Post('black')
  @ApiSuccessResponse(BlackSoilDto)
  async createBlackSoil(
    @Body() createSoilDto: CreateBlackSoilDto,
  ): Promise<SuccessResponseDto<BlackSoilDto>> {
    const result = await this.soilService.createBlackSoil(createSoilDto);
    return {
      message: 'Soil created successfully',
      result,
    };
  }

  @IsPublic()
  @Get('red')
  async getRedSoil(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    const result = await this.soilService.getRedSoil({
      latitude,
      longitude,
    });
    return result;
  }

  @IsPublic()
  @Get('black')
  async getBlackSoil(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    const result = await this.soilService.getBlackSoil({
      latitude,
      longitude,
    });
    return result;
  }
}
