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

    const userDate = user.lastSequencilyDaysSuccess = new Date()

    let date = userDate.setDate(new Date().getDate() + 1)
    
    //sequenci day is diet true starting date now + 1 day
    for await (let _ of Array(4)) {
      
      mealsRepository.create({
        user_id: user.id,
        name: 'Meal',
        description: 'Meal Description',
        isDiet: true,
        created_at: new Date(date + 30)
      })
    }
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal',
      description: 'Meal Description',
      isDiet: false,
      created_at: new Date(date + 35)
    })// stop count
    await mealsRepository.create({
      user_id: user.id,
      name: 'last meal',
      description: 'Meal Description',
      isDiet: true,
      created_at: new Date(date + 40)
    })// resturn count

    const { metrics } = await sut.exceute({
      user_id: user.id,
      lastSequencilyDaysSuccess: userDate,
    })


    expect(metrics.sequencilyDay).toEqual(1)
  })
  it('should be able list a meal of the user', async () => {
    const user = new UserMock()
   const userDate = user.lastSequencilyDaysSuccess = new Date()
    let date = userDate.setDate(new Date().getDate() + 1)
    let dayInMs = 1000 * 60 * 60 * 24 
    // sequenci day is diet true starting date now + 1 day until + 10 days
    for (let i = 1; i <= 10; i++) { 
      await mealsRepository.create({
        user_id: user.id,
        name: 'Meal',
        description: 'Meal Description',
        isDiet: false,
        created_at: new Date(date + dayInMs * i)
      })
    }
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal',
      description: 'Meal Description',
      isDiet: false,
      created_at: new Date(date + dayInMs * 11)
    })
    await mealsRepository.create({
      user_id: user.id,
      name: 'Meal',
      description: 'Meal Description',
      isDiet: true,
      created_at: new Date(date + dayInMs * 12)
    })

    const { metrics } = await sut.exceute({
      user_id: user.id,
      lastSequencilyDaysSuccess: userDate,
    })

    expect(metrics.sequencilyDay).toEqual(1)
  })
  it('should be able list a meal diet success of the user ', async () => {
    const user = new UserMock()
    const userDate = user.lastSequencilyDaysSuccess = new Date()
    let date = userDate.setDate(new Date().getDate() - 1)
   // meals create now 
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
    const { metrics } = await sut.exceute({
      user_id: user.id,
      lastSequencilyDaysSuccess: new Date(date),
    })

    expect(metrics.userMeals).toEqual(3)
    expect(metrics.onDietMeals).toHaveLength(1)
    expect(metrics.offDietMeals).toHaveLength(2)
    expect(metrics.sequencilyDay).toEqual(1)
  })
})

