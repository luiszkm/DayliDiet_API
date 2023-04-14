import { MealModel } from '@/modules/meals/model/mealModel'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createUserMeals(app: FastifyInstance, token: string) {
  const response = await request(app.server)
    .post('/meals/create')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'register meals',
      description: "description meals",
      isDiet: false,
    })
    
    const meal: MealModel = response.body.meals.meal
  return {
    meal
  }
}


