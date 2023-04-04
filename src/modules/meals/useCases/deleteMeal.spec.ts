import { beforeEach, describe, expect, it } from "vitest";
import { MealsImplementations } from "../repository/implementation/mealsImplementations";
import { UpdateMealsUseCase } from "./updateMeal.service";
import { log } from "console";
import { DeleteMealsUseCase } from "./deleteMeal.service";


let mealsRepository: MealsImplementations
let sut: DeleteMealsUseCase

describe('Update Meals UseCase', () => {
  beforeEach(() => {
    mealsRepository = new MealsImplementations()
    sut = new DeleteMealsUseCase(mealsRepository)
  })
  it('should be able delete a meal', async () => {
    const meal = await mealsRepository.create({
      name: 'Meal',
      description: 'Meal Description',
    })
    const meal2 =  await mealsRepository.create({
      name: 'Meal 2',
      description: 'Meal Description 2',
    })
   const {meals}=  await sut.exceute(meal?.props.id || '')
     expect(meals).toHaveLength(1)
  })
})