import { StudentRepository } from "~/domain/student/student-repository"
import { studentListMock } from "../__mocks__/studentList.mock"

export const saveStudent: StudentRepository["save"] = async (student) => {
  // fake save function that adds or updates a student in the mock list
  return new Promise(() => {
    setTimeout(() => {
      const index = studentListMock.findIndex((s) => s.id === student.id)
      if (index !== -1) {
        // Update existing student
        studentListMock[index] = student
      } else {
        // Add new student
        studentListMock.push(student)
      }

    }, 1000) // Simulate network delay
  })
}