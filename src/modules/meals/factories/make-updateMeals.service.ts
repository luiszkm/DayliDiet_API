import {  PrismaMealsImplementations} from "@/modules/meals/repository/implementation/prisma/prisma-measl-implmentations"
import { UpdateMealsUseCase } from "@/modules/meals/useCases/updateMeal.service"


export function makeUpdateMealsService() {
  const usersRepository = new PrismaMealsImplementations()
  const registerService = new UpdateMealsUseCase(usersRepository)

  return registerService
}