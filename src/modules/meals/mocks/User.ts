import { randomUUID } from "crypto";

export class UserMock {
  id: string
  name: string;
  sequencilyDaysSuccess: number;
  lastSequencilyDaysSuccess: Date ;
  constructor() {
    this.id = randomUUID(),
      this.name = 'mock-user',
      this.sequencilyDaysSuccess = 0
      this.lastSequencilyDaysSuccess = new Date()
  }
}

