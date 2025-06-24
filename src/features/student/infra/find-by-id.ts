import { db } from "db/utils"
import { StudentRepository } from "~/domain/student/student-repository"

export const findStudentById: StudentRepository["findById"] = async (id) => {
  const value = await db.query.studentsTable.findFirst({
    where: (s, { eq }) => eq(s.id, id.value),
  })

  return value ?? null
}