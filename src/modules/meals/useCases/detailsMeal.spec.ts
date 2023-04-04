import { beforeEach, describe, expect, it } from "vitest";
import { MealsImplementations } from "../repository/implementation/mealsImplementations";
import { UserMock } from "../mocks/User";
import { DetailsMealsUseCase } from "./detailsMeal.service";
import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error";


let mealsRepository: MealsImplementations
let sut: DetailsMealsUseCase

describe('Details Meals UseCase', () => {
  beforeEach(() => {
    mealsRepository = new MealsImplementations()
    sut = new DetailsMealsUseCase(mealsRepository)
  })
  it('should be able details a meal with its id', async () => {
    const user = new UserMock()
    const meal = await mealsRepository.create({
      user_id: user.id,
      name: 'Meal',
      description: 'Meal Description',
    })
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal 2',
      description: 'Meal Description 2',
    })

    const { meals } = await sut.exceute(meal?.props.id || '')
    expect(meals).toEqual(
      expect.objectContaining({
        id: meal?.props.id,
        name: 'Meal',
        description: 'Meal Description',
      })
    )
  })
  it('should not be able details a meal with id invalid', async () => {
    const user = new UserMock()
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal',
      description: 'Meal Description',
    })
    await expect(
      sut.exceute('2134')
    ).rejects.toBeInstanceOf(InvalidMealsCredentialsErro)
  })
})