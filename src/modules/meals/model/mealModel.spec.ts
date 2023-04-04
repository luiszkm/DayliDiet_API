import { describe, expect, it } from 'vitest'
import { MealModel } from './mealModel'

describe('User model tests', () => {

  it('shold be albe usr model test with all datas', () => {
    const user = new MealModel({
      id: '123',
      user_id: '123',
      name: 'breakfast',
      description: 'description',
      isDiet: false,
      created_at: new Date()
    })
    expect(user.props).toEqual(
      expect.objectContaining({
        id: '123',
        user_id: '123',
        name: 'breakfast',
        description: 'description',
        isDiet: false,
        created_at: expect.any(Date)
      })
    )
  })
  it('shold be albe usr model test with mandatory data', () => {
    const user = new MealModel({
      name: 'breakfast',
      description: 'description',
    })
    expect(user.props).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'breakfast',
        description: 'description',
        isDiet: true,
        created_at: expect.any(Date)
      })
    )
  })

})