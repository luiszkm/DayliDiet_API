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
  isDiet: boolean;
  user_id: string
}
export interface IUserMealInput {
  id: string;
  user_id: string
}
export interface IUserMetricsInput {
  user_id: string
  lastSequencilyDaysSuccess: Date;
}

interface IReplyMetrics {
  userMeals: number;
  onDietMeals: MealModel[];
  offDietMeals: MealModel[];
  sequencilyDay: number;
}


export abstract class MealsRepository {
  abstract create({ name, description, isDiet, user_id, id }: ICreateMealInput): Promise<MealModel | null>
  abstract findById(id: string): Promise<MealModel | null>
  abstract update({ id, description, isDiet, name }: IUpdateMealInput): Promise<IMeal | null>
  abstract delete({ id, user_id }: IUserMealInput): Promise<MealModel[] | null | MealModel>
  abstract details({ id, user_id }: IUserMealInput): Promise<MealModel | null>
  abstract list(user_id: string): Promise<MealModel[] | null>
  abstract metrics({ user_id, lastSequencilyDaysSuccess }: IUserMetricsInput): Promise<IReplyMetrics | null>
}