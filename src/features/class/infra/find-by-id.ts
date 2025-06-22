import { CLassRepository } from "~/domain/class/class-repository"
import { ClassPrimitive } from "~/domain/class/types"
import { Id } from "~/domain/common/id"
import { classListMock } from "../__mocks__/classList.mock"

export const findClassById: CLassRepository["findById"] = async (id) => {
  // currently returns the mock in a fake async function

  const classItem = classListMock.find((classItem) => id.equals(new Id(classItem.id)))
  return new Promise<ClassPrimitive | null>((resolve) => {
    setTimeout(() => {
      resolve(classItem || null)
    }, 1000) // Simulate network delay
  })
}
