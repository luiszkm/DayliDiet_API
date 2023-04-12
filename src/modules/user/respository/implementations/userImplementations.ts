import { UserModel } from "src/modules/user/model/user.model";
import { IUserInput, UserRepository } from "../userRepository";


export class UserImplementation implements UserRepository {

  public items: UserModel[] = []

  async createUser(data: IUserInput): Promise<UserModel> {
    const user = new UserModel(data)
    this.items.push(user);
    return user
  }
  async findByEmail(email: string): Promise<UserModel | null> {
    const user = this.items.find(item => item.email === email)
    if (!user) return null
    return user
  }

}