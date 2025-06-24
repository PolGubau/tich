import { classesTable } from "db/schema"
import { db } from "db/utils"
import { eq } from "drizzle-orm"
import { CLassRepository } from "~/domain/class/class-repository"

export const deleteClass: CLassRepository["delete"] = async (id) => {
  await db.delete(classesTable).where(eq(classesTable.id, id.value))
}