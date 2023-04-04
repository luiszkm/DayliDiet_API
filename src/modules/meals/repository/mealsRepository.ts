import { IMeal, MealModel } from "../model/mealModel";

export interface ICreateMealInput {
  name: string;
  description: string;
  isDiet?: boolean;
}
export interface IUpdateMealInput extends ICreateMealInput {
  id : string;
}

export abstract class MealsRepository {
  abstract create({ name, description }: ICreateMealInput): Promise<MealModel | null>
  abstract findById(id: string): Promise<MealModel | null>
  abstract update({id, description, isDiet = true, name }: IUpdateMealInput): Promise<IMeal | null>
}