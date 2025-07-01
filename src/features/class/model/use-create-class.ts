import { useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { ClassCreatePrimitive } from "~/domain/class/types";
import { Status } from "~/shared/types/basics";
import { classRepository } from "../infra/repo";

export const useCreateClass = () => {
  const emptyClass: ClassCreatePrimitive = {
    topic: "",
    price: { value: 19, currency: "EUR" },
    durationMinutes: 60,
    notes: "",
    isPaid: false,
    date: new Date().toISOString(),
    packId: null,
    studentId: 0,

  }

  const navigation = useNavigation()
  const [status, setStatus] = useState<Status>("idle");

  const create = useCallback(async (newValues: ClassCreatePrimitive) => {
    setStatus("loading");
    try {
      const response = await classRepository.create(newValues);

      setStatus("success");

      navigation.goBack();
      return response;

    } catch (error) {
      setStatus("error");
      console.error("Failed to create class:", error);
      return;
    }

  }, []);



  return { create, emptyClass, status };
};