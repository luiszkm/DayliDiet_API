import { prisma } from '@/lib/prisma'
import { MealModel } from '@/modules/meals/model/mealModel'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createManyUserMeals() {
  const user = await prisma.user.findFirstOrThrow()

  const date = new Date().setDate(new Date().getDate() - 2)
  
  await prisma.meals.createMany({
    data:[
      {
        name: 'register meals',
        description: 'description meals',
        isDiet: true,
        user_id: user.id,
        created_at: new Date(date),
        updated_at: new Date(date)

      }
    ]
  })
}


