import { StudentRepository } from "~/domain/student/student-repository"
import { deleteStudent } from "./delete"
import { findAllStudents } from "./find-all"
import { findStudentById } from "./find-by-id"
import { saveStudent } from "./save"


export const studentRepository: StudentRepository = {
  findAll: findAllStudents,
  findById: findStudentById,
  delete: deleteStudent,
  save: saveStudent
}
