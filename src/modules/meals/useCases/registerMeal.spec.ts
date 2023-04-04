import { beforeEach, describe, expect, it } from "vitest";
import { RegisterMealsUseCase } from "./registerMeal.service";
import { MealsRepository } from "../repository/mealsRepository";
import { MealsImplementations } from "../repository/implementation/mealsImplementations";


let mealsRepository: MealsImplementations
let sut: RegisterMealsUseCase

describe('Register Meals UseCase', () => {
  beforeEach(() => {
    mealsRepository = new MealsImplementations()
    sut = new RegisterMealsUseCase(mealsRepository)
  })
  it('should be able register a meal', async () => {
    const { meal } = await sut.exceute({
      name: 'Meal',
      description: 'Meal Description',
    })

    expect(meal?.props).toEqual(
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