import { ApiProperty } from '@nestjs/swagger';

export class BlackSoil {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  updatedAt: Date | null;
  @ApiProperty({
    type: 'boolean',
  })
  isExist: boolean;
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  address: string;
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  latitude: number;
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  longitude: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  cotton: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  wheat: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  maize: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  sunflower: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  sugarcane: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  rice: number;
}
