import { useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { createStudent } from "~/domain/student/create-student";
import { StudentCreatePrimitive } from "~/domain/student/types";
import { Status } from "~/shared/types/basics";
import { UUIDGenerator } from "~/shared/utils/uuid-generator";
import { studentRepository } from "../infra/repo";

export const useCreateStudent = () => {
  const navigation = useNavigation()
  const [status, setStatus] = useState<Status>("idle");
  const [newStudent, setNewStudent] = useState<StudentCreatePrimitive>({
    name: "",
    email: "",
  });
  const create = useCallback(async (newValues: StudentCreatePrimitive) => {
    setStatus("loading");
    try {
      const student = createStudent(newValues, new UUIDGenerator()).toPrimitive();
      const response = await studentRepository.save(student);

      setStatus("success");

      navigation.goBack();
      return response;

    } catch (error) {
      setStatus("error");
      console.error("Failed to create student:", error);
      return;
    }

  }, []);

  return { create, newStudent, setNewStudent, status };
};