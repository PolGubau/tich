import { Id } from "../id"

export interface AbstractRepository<T> {
  findById(id: Id): Promise<T | null>
  save(entity: T): Promise<T>
  delete(id: Id): Promise<void>
  findAll(): Promise<T[]>
}