import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Id } from "~/domain/common/id";
import { createStudent } from "~/domain/student/create-student";
import { Student } from "~/domain/student/student";
import { StudentPrimitive } from "~/domain/student/types";
import { abstractLoad } from "~/shared/infra/helpers/abstractLoad";
import { Status } from "~/shared/types/basics";
import { studentRepository } from "../infra/repo";


export const useStudent = (id: StudentPrimitive["id"]) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation()



  const load = useCallback(async () => {
    const data = await abstractLoad({
      id: new Id(id),
      getter: studentRepository.findById,
      setError,
      setStatus,
    });
    if (!data) {
      return;
    }
    const student = createStudent(data);
    setStudent(student);
    setStatus("success");

  }, [id]);


  useEffect(() => {
    let isActive = true;
    isActive && load();
    return () => {
      isActive = false;
      setStudent(null);
      setStatus("idle");
      setError(null);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [student])
  )


  const update = async (data: StudentPrimitive) => {
    setStatus("loading");
    try {
      const updatedStudent = await studentRepository.updateById(new Id(data.id), data);
      setStudent(createStudent(updatedStudent));
      setStatus("success");
      navigation.goBack();
    } catch (e) {
      setError("Failed to update student");
      setStatus("error");
      console.error(e);
    }
  }

  const deleteStudent = async () => {
    setStatus("loading");
    try {
      await studentRepository.delete(new Id(id));
      setStudent(null);
      setStatus("success");
      navigation.goBack();
    } catch (e) {
      setError("Failed to delete student");
      setStatus("error");
      console.error(e);
    }
  }


  return {
    student,
    studentStatus: status,
    studentError: error,
    update,
    deleteStudent
  };
};
