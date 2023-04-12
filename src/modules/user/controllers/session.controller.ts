import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSessionService } from '../factories/make-session.service'
import { InvalidCredentialsErro } from '../errors/invalid-credentials-error'



export async function SessionController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = registerBodySchema.parse(request.body)
  try {
     const registerService = makeSessionService()

    await registerService.execute({ email, password })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsErro ) reply.status(400).send({ message: error.message })
    throw error
  }
}