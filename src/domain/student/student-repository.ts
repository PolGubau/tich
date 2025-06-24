import { AbstractRepository } from "../common/abstracts/repository"
import { StudentCreatePrimitive, StudentPrimitive } from "./types"



export interface StudentRepository extends AbstractRepository<StudentPrimitive, StudentCreatePrimitive> { }


