import { MealModel, IMeal } from "@/modules/meals/model/mealModel";
import { ICreateMealInput, IUpdateMealInput, IUserMealInput, MealsRepository } from "../../mealsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaMealsImplementations implements MealsRepository {
  async create({ name, description, isDiet, user_id }: ICreateMealInput): Promise<MealModel | null> {
    const meals = await prisma.meals.create({
      data: {
        name,
        description,
        isDiet,
        user_id
      }
    })
    if (!meals) return null
    return meals
  }
  async findById(id: string): Promise<MealModel | null> {
    const meals = await prisma.meals.findUnique({
      where: {
        id
      }
    })
    if (!meals) return null
    return meals
  }
  async update({ id, description, isDiet, name }: IUpdateMealInput): Promise<IMeal | null> {
    const meals = await prisma.meals.update({
      where: {
        id
      },
      data:{
        description,
        isDiet,
        name,
        updated_at: new Date()
      }
    })
    if (!meals) return null
    return meals
  }
  async delete({ id, user_id }: IUserMealInput): Promise<MealModel[] | null | MealModel > {
    const meals = await prisma.meals.delete({
      where: {
        id,
      }
    })
    if (!meals) return null
    return meals
  }
  async details({ id, user_id }: IUserMealInput): Promise<MealModel | null> {
    throw new Error("Method not implemented.");
  }
  async list(user_id: string): Promise<MealModel[] | null> {
    throw new Error("Method not implemented.");
  }
}