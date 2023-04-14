import { beforeEach, describe, expect, it } from 'vitest'

import { UserImplementation } from '../respository/implementations/userImplementations'
import { UpdateLastDayUseCase } from './UpdateLastDay.service'


let usersRepository:UserImplementation
let sut:UpdateLastDayUseCase
describe('User Update lastDaySuccess tests', () => {
  beforeEach(() => {
    usersRepository = new UserImplementation()
    sut = new UpdateLastDayUseCase(usersRepository)
  })
  it('shold be albe to update user lastSequencilyDaysSuccess ', async () => {
    const user = await usersRepository.createUser({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    })
    const userDate = user.lastSequencilyDaysSuccess = new Date()
    let date = userDate.setDate(new Date().getDate() + 5)// 5 day ago

    const isDateBigger = userDate.getMilliseconds() < date
    await sut.execute({
      id: user.id || '',
      lastDay: new Date(date)
    })

    expect(isDateBigger).toEqual(true)
    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John',
        email: 'john@example.com',
        created_at: expect.any(Date),
        lastSequencilyDaysSuccess: new Date(date)
      })
    )
  })
 
})