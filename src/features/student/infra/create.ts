import { studentsTable } from "db/schema"
import { db } from "db/utils"
import { Id } from "~/domain/common/id"
import { StudentRepository } from "~/domain/student/student-repository"
import { findStudentById } from "./find-by-id"







export const createStudent: StudentRepository["create"] = async (student) => {
  const newStudent = await db.insert(studentsTable).values(student)
  if (!newStudent || !newStudent.lastInsertRowId) {
    throw new Error("Failed to create student, no ID returned")
  }
  const insertedID = newStudent.lastInsertRowId

  const newValue = await findStudentById(new Id(insertedID))

  if (!newValue) {
    throw new Error("Student not found after insertion")
  }

  return newValue

}
