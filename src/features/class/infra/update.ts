import { classesTable } from "db/schema"
import { db } from "db/utils"
import { eq } from "drizzle-orm"
import { ClassRepository } from "~/domain/class/class-repository"
import { findClassById } from "./find-by-id"

export const updateClass: ClassRepository["updateById"] = async (id, partial) => {

  if (Object.keys(partial).length === 0) {
    throw new Error("No fields provided to update")
  }

  await db.update(classesTable)
    .set(({
      ...partial,
      isPaid: partial?.isPaid ? 1 : 0,
      updatedAt: new Date()
    }))
    .where(eq(classesTable.id, id.value))

  const updated = await findClassById(id)

  if (!updated) {
    throw new Error("Class not found after update")
  }

  return updated
}
