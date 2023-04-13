import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeRegisterMealsService } from "../factories/make-registerMeals.service"
import { UnauthorizationErro } from "../errors/unauthorization-error"


export async function RegisterMealsContrtoller( request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isDiet: z.boolean(),
  })
 const user_id: string = request.user.sub

  const { name, description, isDiet } = registerBodySchema.parse(request.body)
  try {
    const registerService = makeRegisterMealsService()

   const meals = await registerService.exceute({description,isDiet,name,user_id})

    return reply.status(201).send({meals})
  } catch (error) {
    if (error instanceof UnauthorizationErro) reply.status(401).send({ message: error.message })

    throw error
  }
}