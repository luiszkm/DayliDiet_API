import { randomUUID } from "node:crypto"

interface IUserModel {
  id?: string
  name: string
  email: string
  password: string
  sequencilyDaysSuccess?: number  | null;
  lastSequencilyDaysSuccess?: Date | null ;
  created_at?: Date | null
}
export class UserModel implements IUserModel {
  name: string
  email: string
  password: string
  id?: string | undefined
  sequencilyDaysSuccess?: number | null
  lastSequencilyDaysSuccess?: Date  | null
  created_at?: Date | null
  constructor({
     id,
     email,
     name,
     password,
     lastSequencilyDaysSuccess,
     sequencilyDaysSuccess,
     created_at
    }: IUserModel ) {
      this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.lastSequencilyDaysSuccess = lastSequencilyDaysSuccess
    this.sequencilyDaysSuccess = sequencilyDaysSuccess
    this.created_at = created_at
    if (!this.id) {
      this.id = randomUUID()
    }
    if (!this.created_at) {
      this.created_at = new Date()
    }
    if (!this.lastSequencilyDaysSuccess) {
      this.lastSequencilyDaysSuccess = new Date()
    }
    if (!this.sequencilyDaysSuccess) {
      this.sequencilyDaysSuccess = 0
    }
  }


}
// export class UserModel {

//   constructor(public props: IUserModel ) {
//     this.props.name = props.name
//     this.props.email = props.email
//     this.props.password = props.password
//     this.props.lastSequencilyDaysSuccess = props.lastSequencilyDaysSuccess
//     this.props.sequencilyDaysSuccess = props.sequencilyDaysSuccess
    
//     if (!this.props.id) {
//       this.props.id = randomUUID()
//     }
//     if (!this.props.created_at) {
//       this.props.created_at = new Date()
//     }
//     if (!this.props.lastSequencilyDaysSuccess) {
//       this.props.lastSequencilyDaysSuccess = new Date()
//     }
//     if (!this.props.sequencilyDaysSuccess) {
//       this.props.sequencilyDaysSuccess = 0
//     }
//   }
// }