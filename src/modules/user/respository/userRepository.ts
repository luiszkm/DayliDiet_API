import { UserModel } from "../model/user.model";
import { Prisma, User } from '@prisma/client'
export interface IUserInput {
  name: string;
  email: string;
  password: string;
}

export abstract class UserRepository {
  abstract createUser(data: IUserInput): Promise<UserModel>
  abstract findByEmail(email: string): Promise<UserModel | null>
}