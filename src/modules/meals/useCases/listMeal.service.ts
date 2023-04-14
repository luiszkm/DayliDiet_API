import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error";
import { MealsRepository } from "../repository/mealsRepository";

interface ICreateMealInput {
  name: string;
  description: string;
  isDiet: boolean;
  id: string;
}

export class ListAllMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {  }

  async exceute(user_id: string) {
    const meals = await this.mealsRespository.list(user_id)
    
    
    if (!meals) throw new InvalidMealsCredentialsErro()

    return {
      meals
    }
  }
}