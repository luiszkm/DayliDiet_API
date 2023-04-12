import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function RegisterMEalsContrtoller( request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isDiet: z.boolean(),
  })
 //user_id: string; jwt

  const { name, description, isDiet } = registerBodySchema.parse(request.body)
  try {
    // const registerService = makeRegisterMealsService()

    // await registerService.execute({ name, email, password })

    return reply.status(201).send()
  } catch (error) {
    throw error
  }
}