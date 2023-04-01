

export class EmailExiststError extends Error {
  constructor(){
    super('Email already exists')
  }
}