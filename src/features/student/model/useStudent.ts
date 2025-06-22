import { useEffect, useState } from "react";
import { Id } from "~/domain/common/identifier";
import { createStudent } from "~/domain/student/create-student";
import { Student } from "~/domain/student/student";
import { StudentPrimitive } from "~/domain/student/types";
import { useClassByStudent } from "~/features/class/model/useClassByStudent";
import { studentRepository } from "../infra/repo";

export const useStudent = (id: StudentPrimitive["id"]) => {

  const [student, setStudent] = useState<Student | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const [error, setError] = useState<string | null>(null);


  const { classes, status: classStatus, error: classError } = useClassByStudent(id);

  useEffect(() => {
    setStatus("loading");
    studentRepository.findById(new Id(id)).then((studentData) => {
      if (studentData) {
        const student = createStudent(studentData);
        setStudent(student);
      } else {
        setError("Student not found");
      }
    }).catch((err) => {
      setError("Failed to fetch student data");
      console.error(err);
    }).finally(() => {
      setStatus("idle");
    });
  }
    , [id]);

  return { student, studentStatus: status, error, classes, classStatus, classError };
}