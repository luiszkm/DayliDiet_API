import { beforeEach, describe, expect, it } from "vitest";
import { MealsImplementations } from "../repository/implementation/mealsImplementations";
import { UpdateMealsUseCase } from "./updateMeal.service";
import { log } from "console";


let mealsRepository: MealsImplementations
let sut: UpdateMealsUseCase

describe('Update Meals UseCase', () => {
  beforeEach(() => {
    mealsRepository = new MealsImplementations()
    sut = new UpdateMealsUseCase(mealsRepository)
  })
  it('should be able update a meal', async () => {
    const meal = await mealsRepository.create({
      name: 'Meal',
      description: 'Meal Description',
    })
    const { mealUpdated } = await sut.exceute({
      description: 'Meal Updated',
      name: 'Meal Updated ',
      id: meal?.props.id || '',
      isDiet: false,
    })

    expect(mealUpdated).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Meal Updated ',
        isDiet: false,
        description: 'Meal Updated',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),

      })
    )
  })
})