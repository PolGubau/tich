import { db } from "db/utils"
import { CLassRepository } from "~/domain/class/class-repository"

export const findClassesByStudentId: CLassRepository["findByStudentId"] = async (studentId) => {
  const value = await db.query["classesTable"].findMany({
    where: (s, { eq }) => eq(s.studentId, studentId.value),
  })

  return value
}
