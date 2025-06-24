import { studentsTable } from "db/schema"
import { db } from "db/utils"
import { eq } from "drizzle-orm"
import { StudentRepository } from "~/domain/student/student-repository"
import { findStudentById } from "./find-by-id"

export const updateStudent: StudentRepository["updateById"] = async (id, partialStudent) => {

  if (Object.keys(partialStudent).length === 0) {
    throw new Error("No fields provided to update")
  }

  await db.update(studentsTable)
    .set(partialStudent)
    .where(eq(studentsTable.id, id.value))

  const updated = await findStudentById(id)

  if (!updated) {
    throw new Error("Student not found after update")
  }

  return updated
}
