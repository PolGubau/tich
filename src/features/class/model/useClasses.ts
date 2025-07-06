import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Class } from "~/domain/class/class";
import { createClass } from "~/domain/class/create-class";
import { ClassPrimitive } from "~/domain/class/types";
import { Status } from "~/shared/types/basics";
import { classRepository } from "../infra/repo";


type UseClassesReturn = {
  classes: ClassPrimitive[];
  status: Status;
  error: string | null;
  reload: () => Promise<void>;
  totalClasses: number;
  totalHours: number;
  moneyEarned: number;
  formattedEarnings: string;
}
export const useClasses = (): UseClassesReturn => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const fetchedClasses = await classRepository.findAll();
      if (fetchedClasses.length > 0) {
        const classesEntity = fetchedClasses.map(createClass);
        // console.log(classesEntity, "classesEntity");
        setClasses(classesEntity);
        setStatus("success");
      } else {
        setError("No classes found");
        setStatus("error");
      }
    } catch (err) {
      console.error("Error fetching classes:", err);
      setError("Failed to fetch classes");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);
  useFocusEffect(
    useCallback(() => {

      fetchClasses();
      return () => {
        setClasses([]);
        setStatus("idle");
        setError(null);
      }
    }, [])
  )


  const totalClasses = classes.length;

  const totalMinutes = classes.reduce((total, c) => {
    const duration = c.durationMinutes;
    return total + (duration ? duration : 0);
  }
    , 0)

  const totalHours = Math.floor(totalMinutes / 60);


  const moneyEarned: number = classes.reduce((total, c) => {
    const price = c.price;
    return total + (price ? price._value : 0);
  }, 0)

  const formattedEarnings: string = moneyEarned.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });


  return { classes: classes.map(c => c.toPrimitive()), status, error, reload: fetchClasses, totalClasses, totalHours, moneyEarned, formattedEarnings };
}