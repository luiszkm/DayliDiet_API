import { UserRepository } from "src/modules/respository/userRepository";
import { EmailExiststError } from "../erros/EmaiExists.error";

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}


export class RegisterUserService {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute({ name, email, password }: ICreateUserRequest) {
    const emailExists = await this.userRepository.findByEmail(email)
    console.log(emailExists?.props.email);
    
   if (emailExists === null || !emailExists) throw new EmailExiststError()


    const user = await this.userRepository.createUser({
      name,
      email,
      password,
    })
    return { user }
  }

}