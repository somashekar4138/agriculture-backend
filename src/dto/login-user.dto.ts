import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  otp: string; // OTP received via SMS
}

export class SendOtpDto {
  @IsNotEmpty()
  phone: string;
}

export class VerifyToken {
  @IsNotEmpty()
  token: string;
}
