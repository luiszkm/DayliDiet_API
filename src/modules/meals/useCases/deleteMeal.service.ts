import { MealsRepository } from "../repository/mealsRepository";

interface ICreateMealInput {
  name: string;
  description: string;
  isDiet: boolean;
  id: string;
}

export class DeleteMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {
    this.mealsRespository = mealsRespository;
  }

  async exceute( id: string) {
    const meals = await this.mealsRespository.delete(id)
    
    return{
      meals
    }
  }
}