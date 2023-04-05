import { beforeEach, describe, expect, it } from "vitest";
import { MealsImplementations } from "../repository/implementation/mealsImplementations";
import { DeleteMealsUseCase } from "./deleteMeal.service";
import { UserMock } from "../mocks/User";
import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error";

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
      isDiet: false
    })
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal 2',
      description: 'Meal Description 2',
      isDiet: true
    })
    const { meals } = await sut.exceute({ id: meal?.props.id || '', user_id: user.id })
    expect(meals).toHaveLength(1)
  })
  it('should not be able delete a meal with id invalid', async () => {
    const user = new UserMock()
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal',
      description: 'Meal Description',
      isDiet: false

    })
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal 2',
      description: 'Meal Description',
      isDiet: true
    })
    await expect(
      sut.exceute({id:'222', user_id: user.id})
    ).rejects.toBeInstanceOf(InvalidMealsCredentialsErro)

  })
})