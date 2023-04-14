import { UserRepository } from "../respository/userRepository";
import { UserAlreadyExistsError } from "../errors/EmaiExists.error";
interface ICreateUserRequest {
  id: string;
  lastDay: Date;
}


export class UpdateLastDayUseCase {
  constructor(private userRepository: UserRepository) { }
  async execute({ id,lastDay }: ICreateUserRequest) {
    const emailExists = await this.userRepository.findByEmail(id)

    if (emailExists) throw new UserAlreadyExistsError()

    const user = await this.userRepository.UpdateLasteDay({lastDay,id})
    return { user }
  }

}
