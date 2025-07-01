import { classesTable } from "db/schema"
import { db } from "db/utils"
import { eq } from "drizzle-orm"
import { ClassRepository } from "~/domain/class/class-repository"

export const deleteClass: ClassRepository["delete"] = async (id) => {
  await db.delete(classesTable).where(eq(classesTable.id, id.value))
}


export const deleteAllClasses = async () => {

  const result = await db.delete(classesTable)
  if (result.changes === undefined || result.changes === 0) {
    throw new Error("No classes were deleted")
  }
  return result.changes
}
