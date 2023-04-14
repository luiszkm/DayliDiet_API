import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/createAndAuthenticateUser";
import { createManyUserMeals } from "@/utils/tests/createManyUserMeals";
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
    const { user } = await createManyUserMeals({})// create 3 meals with isDiet true


    const response = await request(app.server)
      .get(`/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { metrics } = response.body

    expect(response.statusCode).toEqual(201)
    expect(metrics).toEqual(
      expect.objectContaining({
        userMeals: 3,
        sequencilyDay: 3


      })
    )
  })
  it('should be able to list metrics user ', async () => {
    const email = 'testMetrics2@email.com'
    const { token } = await createAndAuthenticateUser(app, email)
    const { user } = await createManyUserMeals({ email, caseThree: true })// create 5 meals with isDiet true next false and last true


    const response = await request(app.server)
      .get(`/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { metrics } = response.body


    expect(response.statusCode).toEqual(201)
    expect(metrics).toEqual(
      expect.objectContaining({
        userMeals: 5,
        sequencilyDay: 1
      })
    )
  })
  it('should be able to list metrics user with 3 meals isDiet true , one false and lat true ', async () => {
    const email = 'testMetrics@email.com'
    const { token } = await createAndAuthenticateUser(app, email)
    const { user } = await createManyUserMeals({ email, caseTwo: true })// create 3 meals with isDiet true
    //Date isDiet false is now + 4  days

    const response = await request(app.server)
      .get(`/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { metrics } = response.body


    expect(response.statusCode).toEqual(201)
    expect(metrics).toEqual(
      expect.objectContaining({
        userMeals: 4,
        sequencilyDay: 0
      })
    )
  })
  it('should be able to list metrics user with user lastSequencilyDaysSuccess equal isDiet false ', async () => {
    const email = 'testMetrics3@email.com'
    const { token } = await createAndAuthenticateUser(app, email)
    await createManyUserMeals({ email, caseTwo: true })// create 3 meals with isDiet true
    //Date isDiet false is now + 4  days


    const response = await request(app.server)
      .get(`/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { metrics } = response.body

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    })

    const dateWithIsdietFalse = new Date(metrics.offDietMeals[0].updated_at).toISOString()
    const userLastDate = user.lastSequencilyDaysSuccess.toISOString()


    const verifyDate = userLastDate === dateWithIsdietFalse


    expect(verifyDate).toEqual(true)
    expect(response.statusCode).toEqual(201)
    expect(metrics).toEqual(
      expect.objectContaining({
        userMeals: 4,
        sequencilyDay: 0
      })
    )
  })

})