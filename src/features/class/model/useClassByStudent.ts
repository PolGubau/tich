import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Class } from "~/domain/class/class";
import { createClass } from "~/domain/class/create-class";
import { Id } from "~/domain/common/id";
import { StudentPrimitive } from "~/domain/student/types";
import { classRepository } from "../infra/repo";

export const useClassByStudent = (id: StudentPrimitive["id"]) => {

  const [classes, setClasses] = useState<Class[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const [error, setError] = useState<string | null>(null);


  const load = async (isActive: boolean) => {
    setStatus("loading");
    try {
      const classData = await classRepository.findByStudentId(new Id(id));
      if (classData && classData.length > 0) {
        setClasses(classData.map((c) => {
          return createClass(c);
        }));
      } else {
        setError("No classes found for this student");
      }
    } catch (err) {
      setError("Failed to fetch class data");
      console.error(err);
    } finally {
      setStatus("idle");
    }
  }

  useEffect(() => {
    load(true);
  }, [id]);

  useFocusEffect(
    () => {
      let isActive = true;
      load(isActive);
      return () => {
        isActive = false;
        setClasses([]);
        setStatus("idle");
        setError(null);
      }
    }
  );


  return { classes, status, error };
} 