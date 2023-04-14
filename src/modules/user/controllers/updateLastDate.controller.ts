


import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterService } from '../factories/make-register.service'
import { UserAlreadyExistsError } from '../errors/EmaiExists.error'



export async function UpdateLastDateController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    lastSequencilyDaysSuccess: z.date()
  })
  const { lastSequencilyDaysSuccess } = registerBodySchema.parse(request.body)
  try {
    // const registerService = makeRegisterService()

    // await registerService.execute({ name, email, password })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) reply.status(409).send({ message: error.message })
    throw error
  }
}