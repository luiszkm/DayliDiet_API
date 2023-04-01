import { UserImplementation } from 'src/modules/respository/implementations/userImplementations'
import { beforeEach, describe, expect, it } from 'vitest'
import { EmailExiststError } from '../erros/EmaiExists.error'
import { RegisterUserService } from './registerUser.service'



let usersRepository:UserImplementation
let sut:RegisterUserService
describe('User model tests', () => {
  beforeEach(() => {
    usersRepository = new UserImplementation()
    sut = new RegisterUserService(usersRepository)
  })
  it('shold be albe to create user', async () => {
    const {user} = await sut.execute({
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
        created_at: expect.any(Date),
      
      })
    )
  })
  it.only('shold be albe to not create user with same email', async () => {
    await sut.execute({
      name: 'John',
      email: 'test@example.com',
      password: '123456',
    })
   await expect(
      sut.execute({
        name: 'John',
        email: 'test@example.coma',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(EmailExiststError)
  })
})