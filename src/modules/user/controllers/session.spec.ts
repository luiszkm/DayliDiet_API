import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
describe('Session Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a session', async () => {

    await request(app.server)
      .post('/users')
      .send({
        name: 'session test',
        email: 'test.session@example.com',
        password: '123456'
      })
    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'test.session@example.com',
        password: '123456'
      })
    expect(response.statusCode).toEqual(200)
  })
  it('should be able to create a session with password wrong', async () => {

    await request(app.server)
      .post('/users')
      .send({
        name: 'session test',
        email: 'test.session@example.com',
        password: '123456'
      })
    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'test.session@example.com',
        password: '12345678'
      })
    expect(response.statusCode).toEqual(400)
  })
})