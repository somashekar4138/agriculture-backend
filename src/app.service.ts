import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { auth } from 'firebase-admin';

@Injectable()
export class AppService {
  async register(registerUserDto: RegisterUserDto) {
    const { email, password, name, phone } = registerUserDto;
    console.log(email, password, name, phone);
    try {
      const user = await auth().createUser({
        email,
        password,
        displayName: name,
        phoneNumber: phone,
      });
      return {
        message: 'User created successfully',
        user,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await auth().verifyIdToken(token);
      const { uid, email, name, phone_number } = decodedToken;
      return {
        id: uid,
        email,
        name,
        phone_number,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }
}
