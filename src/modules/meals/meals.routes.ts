import { FastifyInstance } from "fastify";
import { RegisterMealsContrtoller } from "./controllers/registerMeasl.controller";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { UpdateMealsContrtoller } from "./controllers/updateMeals.controller";
import { DeleteMealsContrtoller } from "./controllers/deleteMeals.controller";
import { DetailsMealsContrtoller } from "./controllers/detailsMeals.controller";
import { ListAllMealsContrtoller } from "./controllers/listAllMeals.controller";



export async function MealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  
  app.post('/meals/create', RegisterMealsContrtoller)
  app.put('/meals/:id', UpdateMealsContrtoller)
  app.delete('/meals/:id', DeleteMealsContrtoller)
  app.get('/meals/:id', DetailsMealsContrtoller)
  app.get('/meals', ListAllMealsContrtoller)

}