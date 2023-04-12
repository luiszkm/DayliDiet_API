import { PrismaUserRepository } from "@/modules/user/respository/implementations/prisma/prisma-user-implementations"
import { RegisterUserUseCase } from "@/modules/user/useCases/registerUser.service"


export function makeRegisterService() {
  const usersRepository = new PrismaUserRepository()
  const registerService = new RegisterUserUseCase(usersRepository)

  return registerService
}