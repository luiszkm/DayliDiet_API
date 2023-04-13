import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error";
import { MealModel } from "../model/mealModel";
import { MealsRepository } from "../repository/mealsRepository";

interface IUserProps {
  user_id: string
  lastSequencilyDaysSuccess: Date
}

export class MetricsMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {}
  async exceute({ user_id, lastSequencilyDaysSuccess }: IUserProps) {
    const metrics  = await this.mealsRespository.metrics({ user_id, lastSequencilyDaysSuccess })
    if (!metrics) throw new InvalidMealsCredentialsErro()

    return { metrics }
  }
}