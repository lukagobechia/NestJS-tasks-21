import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { UserAgentMiddleware } from 'src/middlewares/user-agent.middleware';
import { PermitionMiddleware } from 'src/middlewares/permition.middleware';
import { AvailabilityMiddleware } from 'src/middlewares/availability.middleware';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(UserAgentMiddleware)
    .forRoutes(ExpensesController);

    consumer
      .apply(PermitionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
    .apply(AvailabilityMiddleware)
    .forRoutes(ExpensesController);
  }
}
