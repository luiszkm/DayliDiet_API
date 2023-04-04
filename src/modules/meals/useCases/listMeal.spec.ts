import { beforeEach, describe, expect, it } from "vitest";
import { MealsImplementations } from "../repository/implementation/mealsImplementations";
import { ListMealsUseCase } from "./listMeal.service";
import { UserMock } from "../mocks/User";

let mealsRepository: MealsImplementations
let sut: ListMealsUseCase

describe('List Meals UseCase', () => {
  beforeEach(() => {
    mealsRepository = new MealsImplementations()
    sut = new ListMealsUseCase(mealsRepository)
  })
  it('should be able not list user meals', async () => {
    const user = new UserMock()// user with meals
    const user2 = new UserMock() // user without meals

    {
      const meal = await mealsRepository.create({
        user_id: user.id,
        name: 'Meal',
        description: 'Meal Description',
        isDiet: false
      })
    }
    {
      const meal = await mealsRepository.create({
        user_id: user.id,
        name: 'Meal 2',
        description: 'Meal Description 2',
        isDiet: true
      })
    }
    const { meals } = await sut.exceute(user2.id)
    expect(meals).toHaveLength(0)
  })
  it('should be able list a meal of the user', async () => {
    const user = new UserMock()

    {
      const meal = await mealsRepository.create({
        user_id: user.id,
        name: 'Meal',
        description: 'Meal Description',
        isDiet: false
      })
    }
    {
      const meal = await mealsRepository.create({
        user_id: user.id,
        name: 'Meal 2',
        description: 'Meal Description 2',
        isDiet: true
      })
    }
    const { meals } = await sut.exceute(user.id)
    expect(meals).toHaveLength(2)
  })
})