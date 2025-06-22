import { StudentRepository } from "~/domain/student/student-repository"
import { studentListMock } from "../__mocks__/studentList.mock"

export const saveStudent: StudentRepository["save"] = async (student) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = studentListMock.findIndex((s) => s.id === student.id)
      if (index !== -1) {
        studentListMock[index] = student
      } else {
        studentListMock.push(student)
      }
      resolve(student) // resuelves la promesa con el student actualizado
    }, 1000)
  })
}
