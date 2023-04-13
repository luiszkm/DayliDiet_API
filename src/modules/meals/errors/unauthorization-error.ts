export class UnauthorizationErro extends Error{
 constructor(){
  super('User is not authorized')
 }
}