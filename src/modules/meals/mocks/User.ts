import { randomUUID } from "crypto";


export class UserMock {
  id: string
  name: string;
  description: string;
  sequencilyDaysSuccess: number;
  lastSequencilyDaysSuccess: Date ;
  constructor() {
    this.id = randomUUID(),
      this.name = 'mock-user',
      this.description = 'Mock User description'
      this.sequencilyDaysSuccess = 0
      this.lastSequencilyDaysSuccess = new Date()

  }
}

