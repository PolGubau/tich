import { db } from "db/utils"
import { CLassRepository } from "~/domain/class/class-repository"

export const findClassesByPackId: CLassRepository["findByPackId"] = async (packId) => {
  const value = await db.query["classesTable"].findMany({
    where: (s, { eq }) => eq(s.packId, packId.value),
  })

  return value 
}
