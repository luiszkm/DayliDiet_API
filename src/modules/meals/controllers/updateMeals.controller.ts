import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeUpdateMealsService } from "../factories/make-updateMeals.service"
import { UnauthorizationErro } from "../errors/unauthorization-error"
import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error"

export async function UpdateMealsContrtoller(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isDiet: z.boolean(),
  })

  const paramsSchema = z.object({
    id: z.string()
  })
  const user_id: string = request.user.sub
  const { id } = paramsSchema.parse(request.params)


  const { name, description, isDiet } = registerBodySchema.parse(request.body)
  try {
    const registerService = makeUpdateMealsService()

   const meals =  await registerService.exceute({ description, isDiet, name, user_id, id })
    
    return reply.status(201).send({meals})
  } catch (error) {
    if (error instanceof UnauthorizationErro) reply.status(401).send({ message: error.message })
    if (error instanceof InvalidMealsCredentialsErro) reply.status(403).send({ message: error.message })

    throw error
  }
}