import { CLassRepository } from "~/domain/class/class-repository"
import { deleteClass } from "./delete"
import { findAllClasses } from "./find-all"
import { findClassById } from "./find-by-id"
import { findClassByPackId } from "./find-by-pack-id"
import { findClassByStudentId } from "./find-by-student-id"
import { saveClass } from "./save"


export const classRepository: CLassRepository = {
  findAll: findAllClasses,
  findById: findClassById,
  delete: deleteClass,
  save: saveClass,
  findByStudentId: findClassByStudentId,
  findByPackId: findClassByPackId
}
