import { StudentRepository } from "~/domain/student/student-repository"
import { createStudent } from "./create"
import { deleteStudent } from "./delete"
import { findAllStudents } from "./find-all"
import { findStudentById } from "./find-by-id"
import { updateStudent } from "./update"


export const studentRepository: StudentRepository = {
  findAll: findAllStudents,
  findById: findStudentById,
  delete: deleteStudent,
  create: createStudent,
  updateById: updateStudent,
}
