import { ClassRepository } from "~/domain/class/class-repository"
import { createClass } from "./create"
import { deleteClass } from "./delete"
import { findAllClasses } from "./find-all"
import { findClassById } from "./find-by-id"
import { findClassesByPackId } from "./find-by-pack-id"
import { findClassesByStudentId } from "./find-by-student-id"
import { updateClass } from "./update"


export const classRepository: ClassRepository = {
  findAll: findAllClasses,
  findById: findClassById,
  delete: deleteClass,
  updateById: updateClass,
  create: createClass,
  findByStudentId: findClassesByStudentId,
  findByPackId: findClassesByPackId
}
