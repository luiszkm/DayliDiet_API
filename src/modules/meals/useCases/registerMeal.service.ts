import { MealsRepository } from "../repository/mealsRepository";

interface ICreateMealInput {
  name: string;
  description: string;
}

export class RegisterMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {
    this.mealsRespository = mealsRespository;
  }

  async exceute({ name, description }: ICreateMealInput) {
    const meal = await this.mealsRespository.create({
      name,
      description
    })

    return { meal }
  }

}