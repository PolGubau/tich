import { Id } from "~/domain/common/identifier"
import { StudentRepository } from "~/domain/student/student-repository"
import { StudentPrimitive } from "~/domain/student/types"
import { studentListMock } from "../__mocks__/studentList.mock"

export const findStudentById: StudentRepository["findById"] = async (id) => {
  // currently returns the mock in a fake async function

  const student = studentListMock.find((student) => id.equals(new Id(student.id)))
  return new Promise<StudentPrimitive | null>((resolve) => {
    setTimeout(() => {
      resolve(student || null)
    }, 1000) // Simulate network delay
  })
}
