import { Injectable } from '@nestjs/common';
import { config } from './config/config';


@Injectable()
export class AppService {

  getConfig(): any {
    return { mail_from:config.MAIL_FROM,
             mail_service_type: config.MAIL_SERVICE_TYPE, 
             mail_to: config.MAIL_TO,
             port: config.PORT,
             tipo_persistencia: config.TIPO_PERSISTENCIA,
             sesion_expiration: config.SESION_EXPIRATION,
            }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
