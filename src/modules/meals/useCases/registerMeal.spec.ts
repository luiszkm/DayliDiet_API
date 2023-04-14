import { beforeEach, describe, expect, it } from "vitest";
import { RegisterMealsUseCase } from "./registerMeal.service";
import { MealsImplementations } from "../repository/implementation/mealsImplementations";
import { UserMock } from "../mocks/User";


let mealsRepository: MealsImplementations
let sut: RegisterMealsUseCase

describe('Register Meals UseCase', () => {
  beforeEach(() => {
    mealsRepository = new MealsImplementations()
    sut = new RegisterMealsUseCase(mealsRepository)
  })
  it('should be able register a meal', async () => {
    const user = new UserMock()

    const { meal } = await sut.exceute({
      name: 'Meal',
      description: 'Meal Description',
      user_id: user.id,
      isDiet: true
    })
    await sut.exceute({
      name: 'Meal',
      description: 'Meal Description',
      user_id: user.id,
      isDiet: false
    })

    const allMeals = await mealsRepository.items
    expect(allMeals.length).toBe(2)
    expect(meal).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Meal',
        isDiet: true,
        description: 'Meal Description',
        created_at: expect.any(Date),
      })
    )
  })
})