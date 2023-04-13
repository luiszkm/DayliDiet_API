import {  PrismaMealsImplementations} from "@/modules/meals/repository/implementation/prisma/prisma-measl-implmentations"
import { DeleteMealsUseCase } from "@/modules/meals/useCases/deleteMeal.service"


export function makeDeleteMealsService() {
  const usersRepository = new PrismaMealsImplementations()
  const registerService = new DeleteMealsUseCase(usersRepository)

  return registerService
}