import { db } from "db/utils"
import { ClassRepository } from "~/domain/class/class-repository"
import { classEntitiesToPrimitivesMapper } from "./mappers/entity-to-primitive"

export const findClassesByPackId: ClassRepository["findByPackId"] = async (packId) => {
  const value = await db.query["classesTable"].findMany({
    where: (s, { eq }) => eq(s.packId, packId.value),
  })

  return classEntitiesToPrimitivesMapper(value)
}
