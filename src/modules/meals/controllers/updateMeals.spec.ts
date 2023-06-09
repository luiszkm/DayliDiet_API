import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/createAndAuthenticateUser";
import { createUserMeals } from "@/utils/tests/createUserMeals";
describe('Update Measl Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a user meals', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const { meal } = await createUserMeals(app, token)


    const response = await request(app.server)
      .put(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'update meals',
        description: "description meals update",
        isDiet: false,
      })

    const { mealUpdated } = response.body.meals

    expect(response.statusCode).toEqual(201)
    expect(mealUpdated).toEqual(
      expect.objectContaining({
        name: 'update meals',
        description: "description meals update",
        isDiet: false,
      })
    )
  })

})