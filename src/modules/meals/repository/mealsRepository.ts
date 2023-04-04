import { IMeal, MealModel } from "../model/mealModel";

export interface ICreateMealInput {
  name: string;
  description: string;
  isDiet?: boolean;
  user_id: string;
}
export interface IUpdateMealInput {
  id: string;
  name: string;
  description: string;
  isDiet?: boolean;
}

export abstract class MealsRepository {
  abstract create({ name, description, isDiet,user_id}: ICreateMealInput): Promise<MealModel | null>
  abstract findById(id: string): Promise<MealModel | null>
  abstract update({ id, description, isDiet = true, name }: IUpdateMealInput): Promise<IMeal | null>
  abstract delete(id: string): Promise<MealModel[] | null>
  abstract details(id: string): Promise<MealModel | null>
  abstract list(user_id: string): Promise<MealModel[] | null>
  
}