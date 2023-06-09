import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUserUseCase } from './registerUser.service'
import { UserImplementation } from '../respository/implementations/userImplementations'
import { UserAlreadyExistsError } from '../errors/EmaiExists.error'


let usersRepository:UserImplementation
let sut:RegisterUserUseCase
describe('User model tests', () => {
  beforeEach(() => {
    usersRepository = new UserImplementation()
    sut = new RegisterUserUseCase(usersRepository)
  })
  it('shold be albe to create user', async () => {
    const {user} = await sut.execute({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John',
        email: 'john@example.com',
        created_at: expect.any(Date),
      })
    )
  })
  it('shold be albe to not create user with same email', async () => {
   await sut.execute({
      name: 'John',
      email: 'test@example.com',
      password: '123456',
    })
    
   await expect(
      sut.execute({
        name: 'John',
        email: 'test@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})