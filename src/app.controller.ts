import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { IsPublic } from 'shared/decorator/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return await this.appService.register(registerUserDto);
  }
}
