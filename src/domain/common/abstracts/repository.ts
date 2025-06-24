import { Id } from "../id"

export interface AbstractRepository<T, CreateT = T> {
  findById(id: Id): Promise<T | null>
  create(entity: CreateT): Promise<T>
  updateById(id:Id,entity: Partial<Omit<T,"id">>): Promise<T>
  delete(id: Id): Promise<void>
  findAll(): Promise<T[]>
}