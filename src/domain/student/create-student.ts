import { Student } from "./student"
import { StudentEmail } from "./student-email"
import { StudentId } from "./student-id"




export const createStudent = (
  id: string,
  name: string,
  email: string,
  notes?: string,
  avatarUrl?: string
): Student => {
  return new Student(
    new StudentId(id),
    name,
    new StudentEmail(email),
    notes,
    avatarUrl
  )
}
