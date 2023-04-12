import { hash } from "bcryptjs";
import { UserRepository } from "../respository/userRepository";
import { UserAlreadyExistsError } from "../errors/EmaiExists.error";
interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}


export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) { }
  async execute({ name, email, password }: ICreateUserRequest) {
    const emailExists = await this.userRepository.findByEmail(email)

    if (emailExists) throw new UserAlreadyExistsError()

    const password_hash = await hash(password, 6)

    const user = await this.userRepository.createUser({
      name,
      email,
      password: password_hash,
    })
    return { user }
  }

}
