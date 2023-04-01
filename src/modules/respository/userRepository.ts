import { UserModel } from "../user/model/user.model";

export interface IUserInput {
  name: string;
  email: string;
  password: string;
}

export abstract class UserRepository {
 abstract createUser(datas: IUserInput): Promise<UserModel>
 abstract findByEmail(email: string): Promise<UserModel | null>
}