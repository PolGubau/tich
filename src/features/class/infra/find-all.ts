import { db } from "db/utils"
import { CLassRepository } from "~/domain/class/class-repository"
import { classEntitiesToPrimitivesMapper } from "./mappers/entity-to-primitive"


export const findAllClassesQuery = db.query["classesTable"].findMany()



export const findAllClasses: CLassRepository["findAll"] = async () => {
  const result = await findAllClassesQuery
  return classEntitiesToPrimitivesMapper(result)
}