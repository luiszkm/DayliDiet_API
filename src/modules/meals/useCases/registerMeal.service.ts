import { S } from "vitest/dist/types-94cfe4b4";
import { MealsRepository } from "../repository/mealsRepository";

interface ICreateMealInput {
  name: string;
  description: string;
  user_id: string
}

export class RegisterMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {
    this.mealsRespository = mealsRespository;
  }

  async exceute({ name, description, user_id }: ICreateMealInput) {
    const meal = await this.mealsRespository.create({
      name,
      description,
      user_id
    })

    return { meal }
  }

}