import { MealModel, IMeal } from "@/modules/meals/model/mealModel";
import { ICreateMealInput, IReplyMetrics, IUpdateMealInput, IUserMealInput, IUserMetricsInput, MealsRepository } from "../../mealsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaMealsImplementations implements MealsRepository {
 async metrics({ user_id, lastSequencilyDaysSuccess }: IUserMetricsInput): Promise<IReplyMetrics | null> {
  const userMeals = await prisma.meals.findMany({
    where: {
      user_id
    }
  })
  if (!userMeals) return null

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
    onDietMeals,
    offDietMeals,
    sequencilyDay: 0
  }

  return metrics
  }

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
      data: {
        description,
        isDiet,
        name,
        updated_at: new Date()
      }
    })
    if (!meals) return null
    return meals
  }
  async delete({ id, user_id }: IUserMealInput): Promise<MealModel[] | null | MealModel> {
    const meals = await prisma.meals.delete({
      where: {
        id,
      }
    })
    if (!meals) return null
    return meals
  }
  async details({ id }: IUserMealInput): Promise<MealModel | null> {
    const meals = await prisma.meals.findUnique({
      where: {
        id
      }
    })
    if (!meals) return null
    return meals
  }
  async list(user_id: string): Promise<MealModel[] | null> {
    const meals = await prisma.meals.findMany({
      where: {
        user_id
      }
    })
    if (!meals) return null
    return meals
  }
}