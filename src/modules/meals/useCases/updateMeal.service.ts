import { MealsRepository } from "../repository/mealsRepository";

interface ICreateMealInput {
  name: string;
  description: string;
  isDiet: boolean;
  id: string;
}

export class UpdateMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {
    this.mealsRespository = mealsRespository;
  }

  async exceute({ name, description, id, isDiet }: ICreateMealInput) {
    const mealUpdated = await this.mealsRespository.update({
      name,
      description,
      id,
      isDiet
    })
    return {
      mealUpdated
    }
  }

}