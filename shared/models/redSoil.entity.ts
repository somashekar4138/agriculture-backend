import { ApiProperty } from '@nestjs/swagger';

export class RedSoil {
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
  groundnut: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  kagi: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  pulse: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  vegetable: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  cereal: number;
}
