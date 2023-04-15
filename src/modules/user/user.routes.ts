import { FastifyInstance } from "fastify";
import { UserResgiterController } from "./controllers/userRegister.controller";
import { SessionController } from "./controllers/session.controller";
import { refreshController } from "./controllers/refreshToken.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', UserResgiterController)
  app.post('/sessions', SessionController)
  
  app.patch('/token/refresh', refreshController)


}