import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/createAndAuthenticateUser";
describe('Register Measl Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to registe a user meals', async () => {
    const { token } = await createAndAuthenticateUser(app)
    
    const response = await request(app.server)
      .post('/meals/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'register meals',
        description: "description meals",
        isDiet: true,
      }) 

    const {meal} =  response.body.meals
      
    expect(response.statusCode).toEqual(201)

    expect(meal).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        user_id: expect.any(String),
        name: 'register meals',
        description: 'description meals',
        isDiet: true,
      })
    )
  })

})