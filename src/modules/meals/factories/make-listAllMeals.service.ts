import { PrismaMealsImplementations } from "@/modules/meals/repository/implementation/prisma/prisma-measl-implmentations"
import { ListAllMealsUseCase } from "@/modules/meals/useCases/listMeal.service"


export function makeListAllMealsService() {
  const usersRepository = new PrismaMealsImplementations()
  const registerService = new ListAllMealsUseCase(usersRepository)

  return registerService
}