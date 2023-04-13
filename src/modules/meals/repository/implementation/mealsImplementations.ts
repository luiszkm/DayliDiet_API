import { MealModel } from "../../model/mealModel";
import { ICreateMealInput, IUserMealInput, IUpdateMealInput, MealsRepository, IUserMetricsInput } from "../mealsRepository";

export class MealsImplementations implements MealsRepository {
  public items: MealModel[] = []

  async metrics({ user_id, lastSequencilyDaysSuccess }: IUserMetricsInput) {
    const userMeals = await this.items.filter(item => item.user_id === user_id)
    if (!userMeals) return null;
    const onDietMeals = userMeals.filter(item => item.isDiet === true)
    const offDietMeals = userMeals.filter(item => item.isDiet === false)

    let sequencilyDay = []

    userMeals.filter(item => {
      const created_at = item.created_at
      if (created_at === undefined || created_at === null) return
      return created_at > lastSequencilyDaysSuccess
    }).filter(item => {
      const sequenci = item.isDiet === true
      sequencilyDay.push(item)
      if (!sequenci) return sequencilyDay = []
      return sequenci
    })

    const metrics = {
      userMeals: userMeals.length,
      onDietMeals: onDietMeals,
      offDietMeals: offDietMeals,
      sequencilyDay: sequencilyDay.length
    }

    return metrics
  }

  async details({ id, user_id }: IUserMealInput): Promise<MealModel | null> {
    const mealsUser = await this.items.filter(item => item.user_id === user_id);
    const meal = await mealsUser.find(item => item.id === id);
    if (!meal) return null;
    return meal
  }

  async findById(id: string): Promise<MealModel | null> {
    const meal = await this.items.find(item => item.id === id);
    if (!meal) return null;
    return meal
  }
  async list(user_id: string): Promise<MealModel[] | null> {
    const meal = await this.items.filter(item => item.user_id === user_id);
    if (!meal) return null;
    return meal
  }

  async delete({ id, user_id }: IUserMealInput): Promise<MealModel[] | null> {
    const mealsUser = await this.items.filter(item => item.user_id === user_id);
    const meal = await mealsUser.filter(item => item.id !== id);
    if (!meal) return null;
    return meal
  }
  async update({ id, description, isDiet, name, user_id }: IUpdateMealInput) {
    const mealsUser = await this.items.filter(item => item.user_id === user_id);
    const meal = await mealsUser.find(item => item.id === id);
    if (!meal) return null;

    const mealUpdated = await Object.assign(meal,
      {
        description,
        isDiet,
        name,
        updated_at: new Date()
      })
    return mealUpdated

  }
  async create({ name, description, user_id, isDiet, created_at }: ICreateMealInput): Promise<MealModel | null> {
    try {
      const meal = new MealModel({
        name,
        description,
        user_id,
        isDiet,
        created_at
      })
      this.items.push(meal);
      return meal
    } catch (error) {
      console.error("Impossible create meals", error)
      return null
    }
  }
}