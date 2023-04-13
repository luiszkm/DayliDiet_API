import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error";
import { MealsRepository } from "../repository/mealsRepository";
interface IUserMealInput {
  id: string;
  user_id: string
}
export class DetailsMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {  }

  async exceute( {id, user_id} :IUserMealInput) {
   const idValid = await this.mealsRespository.findById(id)   
   if(!idValid) throw new InvalidMealsCredentialsErro()

    const meals = await this.mealsRespository.details({id,user_id})
    
    return{
      meals: meals
    }
  }
}