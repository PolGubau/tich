import { AbstractRepository } from "../common/abstracts/repository";
import { Id } from "../common/id";
import { ClassCreatePrimitive, ClassPrimitive } from "./types";


type T = ClassPrimitive
export interface ClassRepository extends AbstractRepository<T, ClassCreatePrimitive> {
  findByStudentId: (studentId: Id) => Promise<T[]>;
  findByPackId: (packId: Id) => Promise<T[]>;
}


