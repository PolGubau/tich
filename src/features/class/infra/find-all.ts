import { db } from "db/utils"
import { CLassRepository } from "~/domain/class/class-repository"

export const findAllClasses: CLassRepository["findAll"] = async () => {
  const result = await db.query["classesTable"].findMany()
  return result
}