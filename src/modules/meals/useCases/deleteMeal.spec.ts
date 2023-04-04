import { beforeEach, describe, expect, it } from "vitest";
import { MealsImplementations } from "../repository/implementation/mealsImplementations";
import { DeleteMealsUseCase } from "./deleteMeal.service";
import { UserMock } from "../mocks/User";


let mealsRepository: MealsImplementations
let sut: DeleteMealsUseCase

describe('Update Meals UseCase', () => {
  beforeEach(() => {
    mealsRepository = new MealsImplementations()
    sut = new DeleteMealsUseCase(mealsRepository)
  })
  it('should be able delete a meal', async () => {
    const user = new UserMock()
    const meal = await mealsRepository.create({
      user_id: user.id,
      name: 'Meal',
      description: 'Meal Description',
    })
    const meal2 =  await mealsRepository.create({
      user_id: user.id,
      name: 'Meal 2',
      description: 'Meal Description 2',
    })
   const {meals}=  await sut.exceute(meal?.props.id || '')
     expect(meals).toHaveLength(1)
  })
})