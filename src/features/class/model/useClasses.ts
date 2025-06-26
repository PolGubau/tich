import { useCallback, useEffect, useState } from "react";
import { Class } from "~/domain/class/class";
import { createClass } from "~/domain/class/create-class";
import { Status } from "~/shared/types/basics";
import { classRepository } from "../infra/repo";

export const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const fetchedClasses = await classRepository.findAll();
      if (fetchedClasses) {
        setClasses(fetchedClasses.map(createClass));
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



  const totalClasses = classes.length;

  const totalMinutes = classes.reduce((total, c) => {
    const duration = c.durationMinutes;
    return total + (duration ? duration : 0);
  }
    , 0)

  const totalHours = Math.floor(totalMinutes / 60);


  const moneyEarned:number = classes.reduce((total, c) => {
    const price = c.price;
    return total + (price ? price._value : 0);
  }, 0)

  const formattedEarnings:string = moneyEarned.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });


  return { classes, status, error, reload: fetchClasses, totalClasses, totalHours, moneyEarned,  formattedEarnings };
}