import { beforeEach, describe, expect, it } from "vitest";
import { MealsImplementations } from "../repository/implementation/mealsImplementations";
import { UpdateMealsUseCase } from "./updateMeal.service";
import { log } from "console";
import { UserMock } from "../mocks/User";
import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error";


let mealsRepository: MealsImplementations
let sut: UpdateMealsUseCase

describe('Update Meals UseCase', () => {
  beforeEach(() => {
    mealsRepository = new MealsImplementations()
    sut = new UpdateMealsUseCase(mealsRepository)
  })
  it('should be able update a meal', async () => {
    const user = new UserMock()
    const meal = await mealsRepository.create({
      name: 'Meal',
      description: 'Meal Description',
      user_id: user.id,
      isDiet: true,
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
  it('should not be able update a meal with invalid id', async () => {
    const user = new UserMock()
    const meal = await mealsRepository.create({
      name: 'Meal',
      description: 'Meal Description',
      user_id: user.id,
      isDiet: false,
    })

   await expect(
      sut.exceute({
        description: 'Meal Updated',
        name: 'Meal Updated ',
        id: '12221',// id invalid
        isDiet: false,
      })
    ).rejects.toBeInstanceOf(InvalidMealsCredentialsErro)
  })
})