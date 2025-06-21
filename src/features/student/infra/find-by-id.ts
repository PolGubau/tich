import { StudentId } from "~/domain/student/student-id"
import { StudentRepository } from "~/domain/student/student-repository"
import { StudentPrimitive } from "~/domain/student/types"
import { studentListMock } from "../__mocks__/studentList.mock"

export const findStudentById: StudentRepository["findById"] = async (id) => {
  // currently returns the mock in a fake async function

  const student = studentListMock.find((student) => id.isEqual(new StudentId(student.id)))
  return new Promise<StudentPrimitive | null>((resolve) => {
    setTimeout(() => {
      resolve(student || null)
    }, 1000) // Simulate network delay
  })
}
