import { CLassRepository } from "~/domain/class/class-repository"
import { classListMock } from "../__mocks__/classList.mock"

export const findAllClasses: CLassRepository["findAll"] = async () => {
  // currently returns the mock in a fake async function

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(classListMock)
    }, 1000) // Simulate network delay
  })
}