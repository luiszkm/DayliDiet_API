import { FastifyReply, FastifyRequest } from "fastify"
import { UnauthorizationErro } from "../errors/unauthorization-error"
import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error"
import { makeMetricsMealsService } from "../factories/make-metricsMeals.service"
import { z } from "zod"

export async function MetricsMealsContrtoller(request: FastifyRequest, reply: FastifyReply) {
  const user_id: string = request.user.sub
  const cookieSchema = z.object({
    lastSequencilyDaysSuccess: z.date()
  })  
  const lastSequencilyDaysSuccess = request.user.lastSequencilyDaysSuccess
 
  try {
    const registerService = makeMetricsMealsService()
   const {metrics} = await registerService.exceute({user_id,lastSequencilyDaysSuccess})
   // console.log(new Date(lastSequencilyDaysSuccess) < new Date());
    
    return reply.status(201).send({metrics,lastSequencilyDaysSuccess})
  } catch (error) {
    if (error instanceof UnauthorizationErro) reply.status(401).send({ message: error.message })
    if (error instanceof InvalidMealsCredentialsErro) reply.status(403).send({ message: error.message })
    throw error
  }
}