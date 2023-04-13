import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UnauthorizationErro } from "../errors/unauthorization-error"
import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error"
import { makeDeleteMealsService } from "../factories/make-DeleteMeals.service"

export async function DetailsMealsContrtoller(request: FastifyRequest, reply: FastifyReply) {

  const paramsSchema = z.object({
    id: z.string()
  })
  const user_id: string = request.user.sub
  const { id } = paramsSchema.parse(request.params)

  try {
    const registerService = makeDeleteMealsService()

    await registerService.exceute({ user_id, id })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UnauthorizationErro) reply.status(401).send({ message: error.message })
    if (error instanceof InvalidMealsCredentialsErro) reply.status(403).send({ message: error.message })

    throw error
  }
}