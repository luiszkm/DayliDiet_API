import { UserModel } from "../model/user.model";
import { Prisma, User } from '@prisma/client'
export interface IUserInput {
  name: string;
  email: string;
  password: string;
}
export interface IUpdateInput {
  id: string;
  lastDay: Date;
}

export abstract class UserRepository {
  abstract createUser(data: IUserInput): Promise<UserModel>
  abstract UpdateLasteDay({lastDay, id}:IUpdateInput): Promise<UserModel | null>
  abstract findByEmail(email: string): Promise<UserModel | null>
}