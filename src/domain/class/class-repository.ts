import { AbstractRepository } from "../common/abstracts/repository";
import { Id } from "../common/id";
import { ClassPrimitive } from "./types";


type T = ClassPrimitive
export interface CLassRepository extends AbstractRepository<T> {
  findByStudentId: (studentId: Id) => Promise<T[]>;
  findByPackId: (packId: Id) => Promise<T[]>;
}
