import { studentsTable } from "db/schema"
import { db } from "db/utils"
import { eq } from "drizzle-orm"
import { StudentRepository } from "~/domain/student/student-repository"

export const deleteStudent: StudentRepository["delete"] = async (id) => {
  await db.delete(studentsTable).where(eq(studentsTable.id, id.value))
}