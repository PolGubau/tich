import { useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { StudentCreatePrimitive } from "~/domain/student/types";
import { Status } from "~/shared/types/basics";
import { studentRepository } from "../infra/repo";

export const useCreateStudent = () => {
  const navigation = useNavigation()
  const [status, setStatus] = useState<Status>("idle");
  const [newStudent, setNewStudent] = useState<StudentCreatePrimitive>({
    name: "",
    email: "",
    avatarUrl: null,
    notes: null,
  });
  const create = useCallback(async (newValues: StudentCreatePrimitive) => {
    setStatus("loading");
    try {
      const response = await studentRepository.create(newValues);

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