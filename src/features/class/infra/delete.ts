import { CLassRepository } from "~/domain/class/class-repository"
import { classListMock } from "../__mocks__/classList.mock"

export const deleteClass: CLassRepository["delete"] = async (id) => {
  // fake delete function that removes a class from the mock list
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = classListMock.findIndex((classItem) => classItem.id === id.value)
      if (index !== -1) {
        classListMock.splice(index, 1)
      }
      resolve()
    }, 1000) // Simulate network delay
  })
}