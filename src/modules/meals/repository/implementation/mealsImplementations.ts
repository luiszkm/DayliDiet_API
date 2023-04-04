import { log } from "console";
import { MealModel } from "../../model/mealModel";
import { ICreateMealInput, IUpdateMealInput, MealsRepository } from "../mealsRepository";




export class MealsImplementations implements MealsRepository {

  public items: MealModel[] = []

  async findById(id: string): Promise<MealModel | null> {
    const meal = await this.items.find(item => item.props.id === id);
    if (!meal) return null;
    return meal
  }
  async update({ id, description, isDiet, name }: IUpdateMealInput){
    const meal = await this.findById(id)
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
  async create({ name, description }: ICreateMealInput): Promise<MealModel | null> {
    try {
      const meal = new MealModel({
        name,
        description,
      })
      this.items.push(meal);
      return meal
    } catch (error) {
      console.error("Impossible create meals", error)
      return null
    }
  }
}