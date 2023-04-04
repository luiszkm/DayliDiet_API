import { log } from "console";
import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error";
import { MealsRepository } from "../repository/mealsRepository";

export class DetailsMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {
    this.mealsRespository = mealsRespository;
  }

  async exceute( id: string) {
   const idValid = await this.mealsRespository.findById(id)   
   if(!idValid) throw new InvalidMealsCredentialsErro()

    const meals = await this.mealsRespository.details(id)
    
    return{
      meals: meals?.props
    }
  }
}