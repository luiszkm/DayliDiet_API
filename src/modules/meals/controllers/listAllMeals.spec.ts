import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/createAndAuthenticateUser";
import { createUserMeals } from "@/utils/tests/createUserMeals";
describe('List all Measl Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to list all user meals', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const { meal } = await createUserMeals(app, token)
    

    const response = await request(app.server)
      .get(`/meals`)
      .set('Authorization', `Bearer ${token}`)
      .send()

      
    expect(response.statusCode).toEqual(201)
  })
 
})