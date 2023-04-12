import { compare } from "bcryptjs";
import { UserRepository } from "../respository/userRepository";
import { InvalidCredentialsErro } from "../errors/invalid-credentials-error";

interface IAuthenticateRequest{
  email: string;
  password: string;
}


export class AuthenticateUseCase {
  constructor(
    private usersRepository: UserRepository
  ) { }
 async execute({email, password}:IAuthenticateRequest){
    const user = await this.usersRepository.findByEmail(email)
    if(!user) throw new InvalidCredentialsErro()
    const doesPasswordMatches = await compare(password, user.props.password)
    if(!doesPasswordMatches) throw new InvalidCredentialsErro()
    return{
      user
    }
  }

}