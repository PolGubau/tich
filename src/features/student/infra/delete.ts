import { StudentRepository } from "~/domain/student/student-repository"
import { studentListMock } from "../__mocks__/studentList.mock"

export const deleteStudent: StudentRepository["delete"] = async (id) => {
  // fake delete function that removes a student from the mock list
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = studentListMock.findIndex((student) => student.id === id.value)
      if (index !== -1) {
        studentListMock.splice(index, 1)
      }
      resolve()
    }, 1000) // Simulate network delay
  })
}