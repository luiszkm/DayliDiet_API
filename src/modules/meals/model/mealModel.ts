import { randomUUID } from "node:crypto";

export interface IMeal {
  id?: string;
  user_id: string;
  name: string;
  description: string;
  isDiet: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
}


export class MealModel implements IMeal {
  id?: string | undefined;
  user_id: string;
  name: string;
  description: string;
  created_at?: Date | null;
  updated_at?: Date | null 
  isDiet: boolean;
  constructor({ description,
    isDiet,
    name,
    user_id,
    created_at,
    id,
    updated_at
  }: IMeal) {
    this.name = name
    this.description = description
    this.user_id = user_id
    this.isDiet = isDiet
    if (!this.id) {
      this.id = randomUUID()
    }
    if (!this.created_at) {
      this.created_at = new Date()
    }
    if (!this.updated_at) {
      this.updated_at = null
    }
  }

}