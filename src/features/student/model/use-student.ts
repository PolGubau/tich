import { useEffect, useState } from "react";
import { Id } from "~/domain/common/id";
import { createStudent } from "~/domain/student/create-student";
import { Student } from "~/domain/student/student";
import { StudentPrimitive } from "~/domain/student/types";
import { useClassByStudent } from "~/features/class/model/useClassByStudent";
import { Status } from "~/shared/types/basics";
import { studentRepository } from "../infra/repo";


export const useStudent = (id: StudentPrimitive["id"]) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const {
    classes,
    status: classStatus,
    error: classError,
  } = useClassByStudent(id);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setStatus("loading");
      try {
        const data = await studentRepository.findById(new Id(id));
        if (!data) {
          if (isActive) {
            setError("Student not found");
            setStatus("error");
          }
          return;
        }
        const student = createStudent(data);
        if (isActive) {
          setStudent(student);
          setStatus("success");
        }
      } catch (e) {
        if (isActive) {
          setError("Failed to fetch student data");
          setStatus("error");
          console.error(e);
        }
      }
    };

    load();

    return () => {
      isActive = false;
    };
  }, [id]);




  const update = async (data: StudentPrimitive) => {
    setStatus("loading");
    try {
      const updatedStudent = await studentRepository.save(data);
      console.log("Updated student:", updatedStudent);
      setStudent(createStudent(updatedStudent));
      setStatus("success");
    } catch (e) {
      setError("Failed to update student");
      setStatus("error");
      console.error(e);
    }
  }



  return {
    student,
    studentStatus: status,
    studentError: error,
    classes,
    classStatus,
    classError, update
  };
};
