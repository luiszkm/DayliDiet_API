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
    await createManyUserMeals()
    

    const response = await request(app.server)
      .get(`/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    console.log(response.body.metrics);

    expect(response.statusCode).toEqual(201)
    expect(response.body.metrics).toEqual(
      expect.objectContaining({
        userMeals: 1,
        sequencilyDay: 0
      })
    )
  })

})