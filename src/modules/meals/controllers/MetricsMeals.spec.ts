import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/createAndAuthenticateUser";
import { createManyUserMeals } from "@/utils/tests/createManyUserMeals";
import { createUserMeals } from "@/utils/tests/createUserMeals";
import { prisma } from "@/lib/prisma";
describe.only('Metrics user meals Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to list metrics user ', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await createManyUserMeals()// create 3 meals with isDiet true

    // await request(app.server)
    // .post('/meals/create')
    // .set('Authorization', `Bearer ${token}`)
    // .send({
    //   name: 'register meals',
    //   description: "description meals",
    //   isDiet: false,
    // })
    
    
    
  

    const response = await request(app.server)
      .get(`/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { metrics } = response.body
    console.log(metrics);

    expect(response.statusCode).toEqual(201)
    expect(response.statusCode).toEqual(201)
    expect(metrics).toEqual(
      expect.objectContaining({
        userMeals: 1,
        sequencilyDay: 0
        
      })
    )
  })

})