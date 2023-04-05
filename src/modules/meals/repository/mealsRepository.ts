import { IMeal, MealModel } from "../model/mealModel";

export interface ICreateMealInput {
  id?: string;
  user_id: string;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date | null;
  isDiet: boolean;
}
export interface IUpdateMealInput {
  id: string;
  name: string;
  description: string;
  isDiet?: boolean;
}

export abstract class MealsRepository {
  abstract create({ name, description, isDiet, user_id, id }: ICreateMealInput): Promise<MealModel | null>
  abstract findById(id: string): Promise<MealModel | null>
  abstract update({ id, description, isDiet = true, name }: IUpdateMealInput): Promise<IMeal | null>
  abstract delete(id: string): Promise<MealModel[] | null>
  abstract details(id: string): Promise<MealModel | null>
  abstract list(user_id: string): Promise<MealModel[] | null>

}