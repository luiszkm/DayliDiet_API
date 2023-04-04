export class InvalidMealsCredentialsErro extends Error{
 constructor(){
  super('Invalid credentials, meals cannot found')
 }
}