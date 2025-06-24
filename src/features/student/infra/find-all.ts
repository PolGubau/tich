import { db } from "db/utils";
import { StudentRepository } from "~/domain/student/student-repository";

export const findAllStudents: StudentRepository["findAll"] = async () => {
  const result = await db.query["studentsTable"].findMany()
  return result
}