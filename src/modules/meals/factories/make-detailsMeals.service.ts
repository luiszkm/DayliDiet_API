import {  PrismaMealsImplementations} from "@/modules/meals/repository/implementation/prisma/prisma-measl-implmentations"
import { DetailsMealsUseCase } from "@/modules/meals/useCases/detailsMeal.service"


export function makeDetailsMealsService() {
  const usersRepository = new PrismaMealsImplementations()
  const registerService = new DetailsMealsUseCase(usersRepository)

  return registerService
}