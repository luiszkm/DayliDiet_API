import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error";
import { MealsRepository } from "../repository/mealsRepository";

interface ICreateMealInput {
  name: string;
  description: string;
  isDiet: boolean;
  id: string;
  user_id: string

}

export class UpdateMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {}

  async exceute({ name, description, id, isDiet, user_id }: ICreateMealInput) {
    const idValid = await this.mealsRespository.findById(id)
    if (!idValid) throw new InvalidMealsCredentialsErro()
    
    const mealUpdated = await this.mealsRespository.update({
      name,
      description,
      id,
      isDiet,
      user_id
    })
    return {
      mealUpdated
    }
  }

}