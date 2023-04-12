import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterService } from '../factories/make-register.service'



export async function SessionController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = registerBodySchema.parse(request.body)
  try {
    // const registerService = makeRegisterService()

    // await registerService.execute({ email, password })

    return reply.status(201).send()
  } catch (error) {
    throw error
  }
}