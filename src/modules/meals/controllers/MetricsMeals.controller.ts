import { FastifyReply, FastifyRequest } from "fastify"
import { UnauthorizationErro } from "../errors/unauthorization-error"
import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error"
import { makeMetricsMealsService } from "../factories/make-metricsMeals.service"

export async function MetricsMealsContrtoller(request: FastifyRequest, reply: FastifyReply) {
  const user_id: string = request.user.sub
  const lastSequencilyDaysSuccess = new Date()
  const sequencilyDaysSuccess = 0
  
  try {
    const registerService = makeMetricsMealsService()
    await registerService.exceute({user_id,lastSequencilyDaysSuccess,sequencilyDaysSuccess})

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UnauthorizationErro) reply.status(401).send({ message: error.message })
    if (error instanceof InvalidMealsCredentialsErro) reply.status(403).send({ message: error.message })
    throw error
  }
}