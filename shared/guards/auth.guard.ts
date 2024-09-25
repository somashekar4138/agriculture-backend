import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppService } from 'src/app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly appService: AppService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();

      const isPublic = this.reflector.get<boolean>(
        'isPublic',
        context.getHandler(),
      );

      const token = request.headers.authorization?.split('Bearer ').pop();

      if (isPublic && !token) {
        return true;
      }

      if (!token && !isPublic) {
        throw new UnauthorizedException('No token or api key provided');
      }

      try {
        const user = await this.appService.verifyToken(token);
        request.user = user;
      } catch (error) {
        this.logger.error(error);
        if (!isPublic) {
          throw new UnauthorizedException(error.message);
        }
      }
    }
    return true;
  }
}
