import { randomUUID } from "crypto";


export class UserMock {
  id: string
  name: string;
  description: string;
  constructor() {
    this.id = randomUUID(),
      this.name = 'mock-user',
      this.description = 'Mock User description'
  }
}

