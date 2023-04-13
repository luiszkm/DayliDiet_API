import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error";
import { MealsRepository } from "../repository/mealsRepository";

interface IUserProps {
  user_id: string
  lastSequencilyDaysSuccess: Date
}

interface IMetricas {
  userMeals: number
  onDietMeals: number
  offDietMeals: number
  sequencilyDay: number
}



export class MetricsMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {
    this.mealsRespository = mealsRespository;
  }
  async exceute({ user_id, lastSequencilyDaysSuccess }: IUserProps) {
    const metrics: IMetricas = await this.mealsRespository.metrics({ user_id, lastSequencilyDaysSuccess })
    if (!metrics) throw new InvalidMealsCredentialsErro()

    return { metrics }
  }
}