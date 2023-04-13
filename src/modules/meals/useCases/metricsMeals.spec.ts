import { beforeEach, describe, expect, it } from "vitest";
import { MealsImplementations } from "../repository/implementation/mealsImplementations";
import { UserMock } from "../mocks/User";
import { MetricsMealsUseCase } from "./metricsMeals.service";

let mealsRepository: MealsImplementations
let sut: MetricsMealsUseCase

describe('List Meals UseCase', () => {
  beforeEach(() => {
    mealsRepository = new MealsImplementations()
    sut = new MetricsMealsUseCase(mealsRepository)
  })
  it('should be able list a count meals regisrered in same day ', async () => {
    const user = new UserMock()
    user.lastSequencilyDaysSuccess = new Date('2023-03-01')

    //sequenci day is diet false starting date 2023-03-01
    for (let i = 1; i <= 10; i++) {
      await mealsRepository.create({
        user_id: user.id,
        name: 'Meal',
        description: 'Meal Description',
        isDiet: true,
        created_at: new Date('2023-03-02')
      })
    }
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal',
      description: 'Meal Description',
      isDiet: false,
      created_at: new Date(`2023-03-02`)
    })// stop count
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal',
      description: 'Meal Description',
      isDiet: true,
      created_at: new Date(`2023-03-02`)
    })// resturn count

    const { metrics } = await sut.exceute({
      user_id:user.id,
      lastSequencilyDaysSuccess: user.lastSequencilyDaysSuccess,
    })
  
   
  expect(metrics.sequencilyDay).toEqual(1)
})
  it('should be able list a meal of the user', async () => {
    const user = new UserMock()
    user.lastSequencilyDaysSuccess = new Date('2023-03-01')

    //sequenci day is diet false starting date 2023-03-01
    for (let i = 1; i <= 10; i++) {
      await mealsRepository.create({
        user_id: user.id,
        name: 'Meal',
        description: 'Meal Description',
        isDiet: false,
        created_at: new Date(`2023-03-${i}`)
      })
    }
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal',
      description: 'Meal Description',
      isDiet: false,
      created_at: new Date(`2023-03-11`)
    })
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal',
      description: 'Meal Description',
      isDiet: true,
      created_at: new Date(`2023-03-12`)
    })

    const { metrics } = await sut.exceute({
      user_id:user.id,
      lastSequencilyDaysSuccess: user.lastSequencilyDaysSuccess,
    })
   
  expect(metrics.sequencilyDay).toEqual(1)
})
it('should be able list a meal diet success of the user ', async () => {
  const user = new UserMock()
  user.lastSequencilyDaysSuccess = new Date('2023-03-01')
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
      isDiet: false
    })
  }
  {
    const meal = await mealsRepository.create({
      user_id: user.id,
      name: 'Meal 3',
      description: 'Meal Description 3',
      isDiet: true
    })
  }
  const { metrics} = await sut.exceute({
    user_id:user.id,
    lastSequencilyDaysSuccess: user.lastSequencilyDaysSuccess,
  })

  expect(metrics.userMeals).toEqual(3)
  expect(metrics.onDietMeals).toHaveLength(1)
  expect(metrics.offDietMeals).toHaveLength(2)
  expect(metrics.sequencilyDay).toEqual(1)
})
})

// - Melhor sequência por dia de refeições dentro da dieta [x]