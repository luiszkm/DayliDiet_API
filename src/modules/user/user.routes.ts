import { FastifyInstance } from "fastify";
import { UserResgiterController } from "./controllers/userRegister.controller";
import { SessionController } from "./controllers/session.controller";


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', UserResgiterController)
  app.post('/sessions', SessionController)

}