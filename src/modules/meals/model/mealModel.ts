import { randomUUID } from "node:crypto";

export interface IMeal{
  id?: string;
  user_id?: string;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date | null;
  isDiet?: boolean;
}


export class MealModel {
  constructor(public props: IMeal){
    this.props.name = props.name
    this.props.description = props.description
    this.props.isDiet = props.isDiet
    if(!this.props.id){
      this.props.isDiet = true
    }
    if(!this.props.id){
      this.props.id = randomUUID()
    }
    if(!this.props.created_at){
      this.props.created_at = new Date()
    }
    if(!this.props.updated_at){
      this.props.updated_at = null
    }
  }
}