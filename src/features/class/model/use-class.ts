import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Class } from "~/domain/class/class";
import { createClass } from "~/domain/class/create-class";
import { ClassPrimitive } from "~/domain/class/types";
import { Id } from "~/domain/common/id";
import { Status } from "~/shared/types/basics";
import { classRepository } from "../infra/repo";


export const useClass = (id: ClassPrimitive["id"]) => {
  const [classData, setClassData] = useState<Class | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation()

  const load = useCallback(async (isActive: boolean) => {
    setStatus("loading");
    try {
      const data = await classRepository.findById(new Id(id));
      if (!data) {
        if (isActive) {
          setError("Class not found");
          setStatus("error");
        }
        return;
      }
      const classData = createClass(data);
      if (isActive) {
        setClassData(classData);
        setStatus("success");
      }
    } catch (e) {
      if (isActive) {
        setError("Failed to fetch class data");
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
        setClassData(null);
        setStatus("idle");
        setError(null);
      }
    }, [])
  )


  const update = async (data: ClassPrimitive) => {
    setStatus("loading");
    try {
      const updatedClass = await classRepository.updateById(new Id(data.id), data);
      setClassData(createClass(updatedClass));
      setStatus("success");
      navigation.goBack();
    } catch (e) {
      setError("Failed to update class");
      setStatus("error");
      console.error(e);
    }
  }

  const deleteClass = async () => {
    setStatus("loading");
    try {
      await classRepository.delete(new Id(id));
      setClassData(null);
      setStatus("success");
      navigation.goBack();
    } catch (e) {
      setError("Failed to delete class");
      setStatus("error");
      console.error(e);
    }
  }


  return {
    class: classData,
    status,
    error,
    update,
    deleteClass
  };
};
