import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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

  const navigation = useNavigation()
  const {
    classes,
    status: classStatus,
    error: classError,
  } = useClassByStudent(id);
  const load = useCallback(async (isActive: boolean) => {
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
  }, [id]);
  useEffect(() => {
    let isActive = true;
    load(isActive);
    return () => { isActive = false };
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      load(true);
      return () => {
        setStudent(null);
        setStatus("idle");
        setError(null);
      }
    }, [])
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
    classes,
    classStatus,
    classError,
    update,
    deleteStudent
  };
};
