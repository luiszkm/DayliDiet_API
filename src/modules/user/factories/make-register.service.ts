import { PrismaUserRepository } from "../respository/implementations/prisma/prisma-user-implementations"
import { RegisterUserUseCase } from "../useCases/registerUser.service"

export function makeRegisterService() {
  const usersRepository = new PrismaUserRepository()
  const registerService = new RegisterUserUseCase(usersRepository)

  return registerService
}