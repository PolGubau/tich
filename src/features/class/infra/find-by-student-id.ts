import { CLassRepository } from "~/domain/class/class-repository"
import { ClassPrimitive } from "~/domain/class/types"
import { Id } from "~/domain/common/identifier"
import { classListMock } from "../__mocks__/classList.mock"

export const findClassByStudentId: CLassRepository["findByStudentId"] = async (studentId) => {
  // currently returns the mock in a fake async function

  const classItems = classListMock.filter((classItem) => studentId.equals(new Id(classItem.studentId)))
  return new Promise<ClassPrimitive[]>((resolve) => {
    setTimeout(() => {
      resolve(classItems)
    }, 1000) // Simulate network delay
  })
}
