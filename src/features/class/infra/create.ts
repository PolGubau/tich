import { classesTable } from "db/schema"
import { db } from "db/utils"
import { CLassRepository } from "~/domain/class/class-repository"
import { Id } from "~/domain/common/id"
import { findClassById } from "./find-by-id"
import { createClassMapper } from "./mappers/primitive-to-entity"







export const createClass: CLassRepository["create"] = async (classItem) => {

  const newClass = await db.insert(classesTable).values(createClassMapper(classItem))
  if (!newClass || !newClass.lastInsertRowId) {
    throw new Error("Failed to create class, no ID returned")
  }
  const insertedID = newClass.lastInsertRowId

  const newValue = await findClassById(new Id(insertedID))

  if (!newValue) {
    throw new Error("Class not found after insertion")
  }

  return newValue

}
