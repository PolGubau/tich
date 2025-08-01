import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Class } from "~/domain/class/class";
import { createClass } from "~/domain/class/create-class";
import { Id } from "~/domain/common/id";
import { StudentPrimitive } from "~/domain/student/types";
import { abstractLoad } from "~/shared/infra/helpers/abstractLoad";
import { Status } from "~/shared/types/basics";
import { classRepository } from "../infra/repo";

export const useClassByStudent = (id: StudentPrimitive["id"]) => {

  const [classes, setClasses] = useState<Class[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const [error, setError] = useState<string | null>(null);


  const load = useCallback(async () => {
    setStatus("loading");
    const data = await abstractLoad({
      id: new Id(id),
      getter: classRepository.findByStudentId,
      setError,
      setStatus,
    });
    if (!data?.length) {
      setError("No classes found for this student");
      setStatus("error");
      return;
    }
    setClasses(data.map((c) => {
      return createClass(c);
    }));
    setStatus("success");

  }, [id]);

  useEffect(() => {
    let isActive = true;
    isActive && load();
    return () => {
      isActive = false;
      setClasses([]);
      setStatus("idle");
      setError(null);
    }
  }, [id]);


  useFocusEffect(
    useCallback(() => {
      load();
      return () => {
        setClasses([]);
        setStatus("idle");
        setError(null);
      }
    }, [])
  )

  const classesPrimitives = useMemo(() => {
    return classes.map(c => c.toPrimitive());
  }, [classes]);
  const classesAmount = useMemo(() => {
    return classes.length;
  }, [classes]);


  

  return { classes: classesPrimitives, status, error, reload: load, classesAmount };
} 