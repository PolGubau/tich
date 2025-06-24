import { Student } from "./student"
import { StudentPrimitive } from "./types"




export const createStudent = Student.create

export const createStudents = (
  students: StudentPrimitive[]
) => {
  const valid: Student[] = []
  const errors: { input: StudentPrimitive; error: Error }[] = []

  for (const s of students) {
    try {
      valid.push(Student.create(s))
    } catch (e) {
      errors.push({ input: s, error: e as Error })
    }
  }

  return { valid, errors }
}