import { ClassEntity } from "db/schema"
import { db } from "db/utils"
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { useNavigation } from "expo-router"
import { useRef, useState } from "react"
import { ClassPrimitive } from "~/domain/class/types"
import { Id } from "~/domain/common/id"
import { Status } from "~/shared/types/basics"
import { classEntityToPrimitiveMapper } from "../infra/mappers/entity-to-primitive"
import { classRepository } from "../infra/repo"


type UseClassReturn = {
  class: ClassPrimitive | null
  liveStatus: Status // para la query
  mutationStatus: Status // para update/delete
  error: string | null
  update: (data: ClassPrimitive) => Promise<void>
  deleteClass: () => Promise<void>
  updatedAt?: Date
}

export const useClass = (id: ClassPrimitive["id"]): UseClassReturn => {
  const [mutationStatus, setMutationStatus] = useState<Status>("idle")
  const isMounted = useRef(true)
  const navigation = useNavigation()

  const { data, updatedAt, error } = useLiveQuery(
    db.query["classesTable"].findFirst({
      where: (s, { eq }) => eq(s.id, id),
    })
  )

  const classData = data ? classEntityToPrimitiveMapper(data as ClassEntity) : null

  const liveStatus: Status = error ? "error" : data ? "success" : "loading"

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
    class: classData,
    liveStatus,
    mutationStatus,
    error: error?.message ?? null,
    update,
    deleteClass,
    updatedAt,
  }
}
