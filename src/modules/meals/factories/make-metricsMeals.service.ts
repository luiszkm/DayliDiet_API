import {  PrismaMealsImplementations} from "@/modules/meals/repository/implementation/prisma/prisma-measl-implmentations"
import { MetricsMealsUseCase } from "@/modules/meals/useCases/metricsMeals.service"


export function makeMetricsMealsService() {
  const usersRepository = new PrismaMealsImplementations()
  const registerService = new MetricsMealsUseCase(usersRepository)

  return registerService
}