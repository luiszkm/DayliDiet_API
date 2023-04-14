import { UserModel } from "src/modules/user/model/user.model";
import { IUpdateInput, IUserInput, UserRepository } from "../userRepository";


export class UserImplementation implements UserRepository {
  public items: UserModel[] = []

 async UpdateLasteDay({id,lastDay}: IUpdateInput): Promise<UserModel | null> {
    const user = this.items.find(item => item.id === id)
    if (!user) return null
    user.lastSequencilyDaysSuccess = lastDay
    return user
  }
 


 


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