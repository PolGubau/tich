import { db } from "db/utils"
import { CLassRepository } from "~/domain/class/class-repository"
import { Id } from "~/domain/common/id"
import { classEntitiesToPrimitivesMapper } from "./mappers/entity-to-primitive"


export const findClassesByStudentIdQuery = (studentId: Id) => db.query["classesTable"].findMany({
  where: (s, { eq }) => eq(s.studentId, studentId.value),
})
export const findClassesByStudentId: CLassRepository["findByStudentId"] = async (studentId) => {
  const value = await findClassesByStudentIdQuery(studentId)

  return classEntitiesToPrimitivesMapper(value)
}
