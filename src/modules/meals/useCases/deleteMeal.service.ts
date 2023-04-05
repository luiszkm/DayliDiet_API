import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error";
import { MealsRepository } from "../repository/mealsRepository";

interface IUserMealInput {
  user_id: string;
  id: string;
}

export class DeleteMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {
    this.mealsRespository = mealsRespository;
  }

  async exceute( {id,user_id}:IUserMealInput) {
    const idValid = await this.mealsRespository.findById(id)
    if(!idValid) throw new InvalidMealsCredentialsErro()
    const meals = await this.mealsRespository.delete({id, user_id})
    
    return{
      meals
    }
  }
}