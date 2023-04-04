import { beforeEach, describe, expect, it } from 'vitest'
import { compare, hash } from 'bcryptjs'

import { AuthenticateUseCase } from './autenticate.service'
import { UserImplementation } from '../respository/implementations/userImplementations'
import { InvalidCredentialsErro } from '../errors/invalid-credentials-error'



let usersRepository: UserImplementation
let sut: AuthenticateUseCase
describe('Authenticate UseCase ', () => {
  beforeEach(() => {
    usersRepository = new UserImplementation()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('shold be albe to authenticate with  wrong email', async () => {
    await usersRepository.createUser({
      name: 'John',
      email: 'test@example.com',
      password: await hash('123456', 6)
    })

    await expect(
      sut.execute({
        email: 't@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsErro)
  })
  it('shold be albe to authenticate with wrong password', async () => {
    const user = await usersRepository.createUser({
      name: 'John',
      email: 'test@example.com',
      password: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        email: 'test@example.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsErro)
  })
  it('shold be albe to authenticate with credentials correct', async () => {
    await usersRepository.createUser({
      name: 'John',
      email: 'test@example.com',
      password: await hash('123456', 6),
    })

    const {user} = await sut.execute({
        email: 'test@example.com',
        password: '123456'
      })

      expect(user.props.id).toEqual(expect.any(String))
  })
})