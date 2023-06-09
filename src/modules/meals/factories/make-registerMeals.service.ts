import {  PrismaMealsImplementations} from "@/modules/meals/repository/implementation/prisma/prisma-measl-implmentations"
import { RegisterMealsUseCase } from "@/modules/meals/useCases/registerMeal.service"


export function makeRegisterMealsService() {
  const usersRepository = new PrismaMealsImplementations()
  const registerService = new RegisterMealsUseCase(usersRepository)

  return registerService
}