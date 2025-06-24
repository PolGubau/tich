import { db } from "db/utils"
import { CLassRepository } from "~/domain/class/class-repository"
import { classEntityToPrimitiveMapper } from "./mappers/entity-to-primitive"

export const findClassById: CLassRepository["findById"] = async (id) => {
  const value = await db.query["classesTable"].findFirst({
    where: (s, { eq }) => eq(s.id, id.value),
  })

  return value ? classEntityToPrimitiveMapper(value) : null
}
