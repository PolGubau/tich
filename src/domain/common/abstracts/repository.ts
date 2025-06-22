import { Id } from "../identifier"

export interface AbstractRepository<T> {
  findById(id: Id): Promise<T | null>
  save(entity: T): Promise<void>
  delete(id: Id): Promise<void>
  findAll(): Promise<T[]>
}