import { PrismaUserRepository } from "../respository/implementations/prisma/prisma-user-implementations"
import { AuthenticateUseCase } from "../useCases/autenticate.service"

export function makeSessionService() {
  const usersRepository = new PrismaUserRepository()
  const sessionService = new AuthenticateUseCase(usersRepository)

  return sessionService
}