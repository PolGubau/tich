import { CLassRepository } from "~/domain/class/class-repository"
import { classListMock } from "../__mocks__/classList.mock"

export const saveClass: CLassRepository["save"] = async (classItem) => {
  // fake save function that adds or updates a class in the mock list
  return new Promise(() => {
    setTimeout(() => {
      const index = classListMock.findIndex((c) => c.id === classItem.id)
      if (index !== -1) {
        // Update existing class
        classListMock[index] = classItem
      } else {
        // Add new class
        classListMock.push(classItem)
      }

    }, 1000) // Simulate network delay
  })
}