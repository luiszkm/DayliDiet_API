import { FastifyReply, FastifyRequest } from "fastify"
import { UnauthorizationErro } from "../errors/unauthorization-error"
import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error"
import { makeListAllMealsService } from "../factories/make-listAllMeals.service"

export async function ListAllMealsContrtoller(request: FastifyRequest, reply: FastifyReply) {
  const user_id: string = request.user.sub
  try {
    const registerService = makeListAllMealsService()
   const meals = await registerService.exceute(user_id)

    return reply.status(201).send({meals})
  } catch (error) {
    if (error instanceof UnauthorizationErro) reply.status(401).send({ message: error.message })
    if (error instanceof InvalidMealsCredentialsErro) reply.status(403).send({ message: error.message })
    throw error
  }
}