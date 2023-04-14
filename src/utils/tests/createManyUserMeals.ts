import { prisma } from '@/lib/prisma'
import { MealModel } from '@/modules/meals/model/mealModel'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createManyUserMeals() {
  const user = await prisma.user.findFirstOrThrow()

  await prisma.meals.createMany({
    data: [
      {
        name: 'meals prisma',
        description: "description ",
        isDiet: true,
        user_id: user.id,
      },
      {
        name: 'meals prisma',
        description: "description ",
        isDiet: true,
        user_id: "11111",
      },

    ]
  })
}


