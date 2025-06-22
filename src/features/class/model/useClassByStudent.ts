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

  useEffect(() => {
    setStatus("loading");
    classRepository.findByStudentId(new Id(id)).then((classData) => {
      if (classData && classData.length > 0) {
        setClasses(classData.map((c) => {
          return createClass(c);
        }));
      } else {
        setError("No classes found for this student");
      }
    }).catch((err) => {
      setError("Failed to fetch class data");
      console.error(err);
    }).finally(() => {
      setStatus("idle");
    });
  }, [id]);

  return { classes, status, error };
}