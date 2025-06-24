import { db } from "db/utils"
import { CLassRepository } from "~/domain/class/class-repository"
import { classEntitiesToPrimitivesMapper } from "./mappers/entity-to-primitive"

export const findAllClasses: CLassRepository["findAll"] = async () => {
  const result = await db.query["classesTable"].findMany()
  return classEntitiesToPrimitivesMapper(result)
}