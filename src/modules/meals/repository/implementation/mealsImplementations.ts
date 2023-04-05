import { MealModel } from "../../model/mealModel";
import { ICreateMealInput, IUpdateMealInput, MealsRepository } from "../mealsRepository";

export class MealsImplementations implements MealsRepository {
  public items: MealModel[] = []

 async details(id: string): Promise<MealModel | null> {
    const meal = await this.items.find(item => item.props.id === id);
    if (!meal) return null;
    return meal
  }

  async findById(id: string): Promise<MealModel | null> {
    const meal = await this.items.find(item => item.props.id === id);
    if (!meal) return null;
    return meal
  }
  async list(user_id: string): Promise<MealModel[] | null> {
    const meal = await this.items.filter(item => item.props.user_id === user_id);
    if (!meal) return null;
    return meal
  }

  async delete(id: string): Promise<MealModel[] | null> {
    const meal = await this.items.filter(item => item.props.id !== id);
    if (!meal) return null;
    return meal
  }
  async update({ id, description, isDiet, name }: IUpdateMealInput) {
    const meal = await this.items.find(item => item.props.id === id);
    if (!meal) return null;

    const mealUpdated = await Object.assign(meal.props,
      {
        description,
        isDiet,
        name,
        updated_at: new Date()
      })
    return mealUpdated

  }
  async create({ name, description,user_id,isDiet, created_at }: ICreateMealInput): Promise<MealModel | null> {
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