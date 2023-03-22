
export interface UserInterface {
  firstName: string
  lastName: string
  email: string
  password: string
  age: number
}

export interface UserInterfaceWithId extends UserInterface {
  id: string
}

export {}
