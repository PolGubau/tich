import { useFocusEffect, useNavigation } from "expo-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { Class } from "~/domain/class/class"
import { createClass } from "~/domain/class/create-class"
import { ClassPrimitive } from "~/domain/class/types"
import { Id } from "~/domain/common/id"
import { Status } from "~/shared/types/basics"
import { classRepository } from "../infra/repo"
import { getLocaleClassData, LocaleClassData } from "./get-locale-class-data"


type UseClassReturn = {
  class: ClassPrimitive | null
  liveStatus: Status // para la query
  mutationStatus: Status // para update/delete
  error: string | null
  update: (data: ClassPrimitive) => Promise<void>
  deleteClass: () => Promise<void>
  updatedAt?: Date
  metadata: LocaleClassData
}

export const useClass = (id: ClassPrimitive["id"]): UseClassReturn => {
  const [mutationStatus, setMutationStatus] = useState<Status>("idle")
  const isMounted = useRef(true)
  const [status, setStatus] = useState<Status>("idle");

  const navigation = useNavigation()
  const [classData, setClassData] = useState<Class | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchClass = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const fetchedClasses = await classRepository.findById(new Id(id));
      if (fetchedClasses) {
        const classesEntity = createClass(fetchedClasses)
        setClassData(classesEntity);
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
    fetchClass();
  }, [fetchClass]);

  useFocusEffect(
    useCallback(() => {
      fetchClass();
      return () => {
        setClassData(null);
        setStatus("idle");
        setError(null);
      }
    }, [])
  )

  const classPrimitive = classData ? classData.toPrimitive() : null

  const update = async (data: ClassPrimitive) => {
    setMutationStatus("loading")
    try {
      await classRepository.updateById(new Id(data.id), data)
      if (isMounted.current) {
        setMutationStatus("success")
        navigation.goBack()
      }
    } catch (e) {
      if (isMounted.current) {
        setMutationStatus("error")
        console.error("update() error in useClass", e)
      }
    }
  }

  const deleteClass = async () => {
    setMutationStatus("loading")
    try {
      await classRepository.delete(new Id(id))
      if (isMounted.current) {
        setMutationStatus("success")
        navigation.goBack()
      }
    } catch (e) {
      if (isMounted.current) {
        setMutationStatus("error")
        console.error("deleteClass() error in useClass", e)
      }
    }
  }




  return {
    class: classPrimitive,
    liveStatus: status,
    mutationStatus,
    error: error ?? null,
    update,
    deleteClass,
    metadata: getLocaleClassData(classPrimitive),
  }
}
