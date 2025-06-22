import { CLassRepository } from "~/domain/class/class-repository"
import { ClassPrimitive } from "~/domain/class/types"
import { Id } from "~/domain/common/id"
import { classListMock } from "../__mocks__/classList.mock"

export const findClassByPackId: CLassRepository["findByPackId"] = async (packId) => {
  // currently returns the mock in a fake async function

  const classItems = classListMock.filter((classItem) => {
    if (classItem.packId) {
      return packId.equals(new Id(classItem.packId))
    }
  })
  return new Promise<ClassPrimitive[]>((resolve) => {
    setTimeout(() => {
      resolve(classItems)
    }, 1000) // Simulate network delay
  })
}
