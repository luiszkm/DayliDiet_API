import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance, email?:string) {
   if(!email){
    email = `user_${Math.random()}@mail.com`
   }
   await prisma.user.create({
    data: {
      name: 'user Mock',
      email,
      password: await hash('123456', 6),
      lastSequencilyDaysSuccess: new Date()
    }
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email,
      password: '123456'
    })
  const { token } = authResponse.body
  return {
    token,
  }
}
