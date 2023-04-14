import { FastifyInstance } from "fastify";
import { UserResgiterController } from "./controllers/userRegister.controller";
import { SessionController } from "./controllers/session.controller";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { UpdateLastDateController } from "./controllers/updateLastDate.controller";


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', UserResgiterController)
  app.post('/sessions', SessionController)


  app.patch('/user',{
     onRequest: verifyJWT
  }, UpdateLastDateController)
}