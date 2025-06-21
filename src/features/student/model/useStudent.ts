import { useEffect, useState } from "react";
import { createStudent } from "~/domain/student/create-student";
import { Student } from "~/domain/student/student";
import { StudentId } from "~/domain/student/student-id";
import { StudentPrimitive } from "~/domain/student/types";
import { studentRepository } from "../infra/repo";

export const useStudent = (id: StudentPrimitive["id"]) => {

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    studentRepository.findById(new StudentId(id)).then((studentData) => {
      if (studentData) {
        const { id, name, email, notes, avatarUrl } = studentData;
        const student = createStudent(
          id,
          name,
          email,
          notes,
          avatarUrl
        );
        setStudent(student);
      } else {
        setError("Student not found");
      }
    }).catch((err) => {
      setError("Failed to fetch student data");
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }
    , [id]);

  return { student, loading, error };
}