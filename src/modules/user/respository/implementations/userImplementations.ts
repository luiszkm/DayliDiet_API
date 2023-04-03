import { UserModel } from "src/modules/user/model/user.model";
import { IUserInput, UserRepository } from "../userRepository";


export class UserImplementation implements UserRepository {

  public items: UserModel[] = []

  async createUser(datas: IUserInput): Promise<UserModel> {
    const user = new UserModel(datas)
    this.items.push(user);
    return user
  }
  async findByEmail(email: string): Promise<UserModel | null> {
    const user = this.items.find(item => item.props.email === email)
    if (!user) return null
    return user
  }

}