export interface IMenuItems {
  label: string
  icon?: string
  command?: any
  route?: any
  class?: string
  items?: IMenuItems[]
  [key: string]: any
}

export interface IAuthor {
  id: number | string | null
  firstName: string
  lastName: string
}

export interface IEntity {
  id: number | string | null
  createdAt?: string | null
  deletedAt?: string | null
  updatedAt?: string | null
  createdBy?: IAuthor
  updatedBy?: IAuthor
}
