import { MealsRepository } from "../repository/mealsRepository";

interface ICreateMealInput {
  name: string;
  description: string;
  isDiet: boolean;
  id: string;
}

export class ListMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {
    this.mealsRespository = mealsRespository;
  }

  async exceute( user_id: string) {
    const meals = await this.mealsRespository.list(user_id)
    return{
      meals
    }
  }
}