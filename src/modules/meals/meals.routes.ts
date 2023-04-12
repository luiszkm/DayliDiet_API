import { FastifyInstance } from "fastify";



export async function MealsRoutes(app: FastifyInstance) {
  app.post('/users', UserResgiterController)
  app.post('/sessions', SessionController)

}