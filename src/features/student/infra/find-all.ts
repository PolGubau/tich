import { StudentRepository } from "~/domain/student/student-repository"
import { studentListMock } from "../__mocks__/studentList.mock"

export const findAllStudents: StudentRepository["findAll"] = async () => {
  // currently returns the mock in a fake async function

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(studentListMock)
    }, 1000) // Simulate network delay
  })
}