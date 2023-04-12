import { randomUUID } from "node:crypto"

interface IUserModel {
  id?: string
  name: string
  email: string
  password: string
  sequencilyDaysSuccess?: number;
  lastSequencilyDaysSuccess?: Date;
  created_at?: Date
}
export class UserModel {
  constructor(public props: IUserModel ) {
    this.props.name = props.name
    this.props.email = props.email
    this.props.password = props.password
    this.props.lastSequencilyDaysSuccess = props.lastSequencilyDaysSuccess
    this.props.sequencilyDaysSuccess = props.sequencilyDaysSuccess
    
    if (!this.props.id) {
      this.props.id = randomUUID()
    }
    if (!this.props.created_at) {
      this.props.created_at = new Date()
    }
    if (!this.props.lastSequencilyDaysSuccess) {
      this.props.lastSequencilyDaysSuccess = new Date()
    }
    if (!this.props.sequencilyDaysSuccess) {
      this.props.sequencilyDaysSuccess = 0
    }
  }
}