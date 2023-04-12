import { UserModel } from "../model/user.model";
import { Prisma, User } from '@prisma/client'
export interface IUserInput {
  name: string;
  email: string;
  password: string;
}

export abstract class UserRepository {
  abstract createUser(data: IUserInput | Prisma.UserCreateInput): Promise<UserModel | User>
  abstract findByEmail(email: string): Promise<UserModel | null | User>
}