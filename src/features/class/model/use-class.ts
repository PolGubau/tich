import { ClassEntity } from "db/schema"
import { db } from "db/utils"
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { getLocales } from 'expo-localization'
import { useNavigation } from "expo-router"
import { useMemo, useRef, useState } from "react"
import { ClassPrimitive, CurrencyCode } from "~/domain/class/types"
import { Id } from "~/domain/common/id"
import i18n from "~/shared/i18n/i18n"
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
  metadata: {
    createdDaysAgo: string
    updatedDaysAgo: string
    price: string
    duration: string
  }
}

export const useClass = (id: ClassPrimitive["id"]): UseClassReturn => {
  const locale = getLocales()[0];
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

  const getDaysAgo = (date: Date): string => {
    const to = new Date();
    const from = date
    return i18n.timeAgoInWords(from, to);
  };

  const createdDaysAgo = useMemo(() =>
    classData?.createdAt ? getDaysAgo(classData.createdAt) : i18n.t('unknown'),
    [classData?.createdAt]
  );

  const updatedDaysAgo = useMemo(() =>
    classData?.updatedAt ? getDaysAgo(classData.updatedAt) : i18n.t('unknown'),
    [classData?.updatedAt]
  );

  const getMoneyFormat = (value: number, currencyCode: CurrencyCode): string => {
    const getCurrencySymbol = (code: CurrencyCode): string => {
      switch (code) {
        case "EUR":
          return "€";
        default:
          return "$"; // Default to dollar if no match
      }
    };
    return i18n.numberToCurrency(value, { unit: getCurrencySymbol(currencyCode), format: "%n%u" });
  };

  const formattedPrice = useMemo(() =>
    classData?.price ? getMoneyFormat(classData.price.value, classData.price.currency) : "Desconocido",
    [classData?.price?.value]
  );

  const formattedDuration = useMemo(() => {
    const minutes = classData?.durationMinutes ?? 0;
    return i18n.t("minutes", { count: minutes });
  }, [classData?.durationMinutes]);


  return {
    class: classData,
    liveStatus,
    mutationStatus,
    error: error?.message ?? null,
    update,
    deleteClass,
    metadata: {
      createdDaysAgo,
      updatedDaysAgo,
      price: formattedPrice,
      duration: formattedDuration
    },
  }

}
