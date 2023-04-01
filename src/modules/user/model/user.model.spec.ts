import { describe, expect, it } from 'vitest'
import { UserModel } from './user.model'

describe('User model tests', () => {

  it('shold be albe usr model test with all datas', () => {
    const user = new UserModel({
      id: '123',
      name: 'John',
      email: 'john@example.com',
      password: '123456',
      created_at: new Date()
    })
    expect(user.props).toEqual(
      expect.objectContaining({
        id: '123',
        name: 'John',
        email: 'john@example.com',
        password: '123456',
        created_at: expect.any(Date)
      })
    )
  })
  it('shold be albe usr model test with only datas required', () => {
    const user = new UserModel({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })
    expect(user.props).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John',
        email: 'john@example.com',
        password: '123456',
        created_at: expect.any(Date)
      })
    )
  })


})