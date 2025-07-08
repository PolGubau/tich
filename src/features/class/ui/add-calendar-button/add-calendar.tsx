import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { createEventInCalendarAsync, getDefaultCalendarAsync, requestCalendarPermissionsAsync } from 'expo-calendar'
import React from 'react'
import { Alert, Pressable, } from 'react-native'
import { ClassPrimitive } from '~/domain/class/types'
import { useStudent } from '~/features/student/model/use-student'
import { Text } from '~/shared/components/Text'
import { useColorScheme } from '~/shared/hooks/useColorScheme'
import { t } from '~/shared/i18n/i18n'



type Props = {
  class: ClassPrimitive
}
export function AddCalendarButton({ class: classData }: Props) {
  const theme = useColorScheme()
  const { student } = useStudent(classData.studentId)

  const addClassToCalendar = () => {
    if (!classData || !student?.name) {
      return
    }
    console.log("Asking to add class to calendar", classData.id, student.name)
    requestCalendarPermissionsAsync()
      .then(({ status }) => {
        if (status !== 'granted') {
          console.log("Calendar permissions not granted")
          throw new Error("Calendar permissions not granted")
        }
        return getDefaultCalendarAsync()
      })
      .then(async ({ id }) => {
        if (!id) {
          console.log("No default calendar found")
          throw new Error("No default calendar found")
        }

        console.log("Adding class to calendar", classData.id, "to calendar", id)
        // endDate is classData.date + classData.duration in minutes
        const endDate = new Date(classData.date)
        endDate.setMinutes(endDate.getMinutes() + classData.durationMinutes)

        const { action } = await createEventInCalendarAsync({
          calendarId: id,
          title: `${classData.topic} class for ${student?.name ?? "Student"}`,
          startDate: classData.date,
          endDate: endDate,
          creationDate: classData.createdAt,
          timeZone: "Europe/Madrid",
          notes: classData.notes,
        })

        if (action === 'deleted') {
          console.log("Class was deleted from calendar")
        } else if (action === "canceled") {
          console.log("Calendar event action was canceled")
        } else if (action === "done") {
          console.log("Calendar event action:", action)
          Alert.alert(t("success"), t("class_added_to_calendar"))
        } else {
          console.log("Class was not added to calendar, action:", action)
        }

      })
  }
  return (
    <Pressable onPress={addClassToCalendar} className='flex-row items-center gap-2 bg-blue-400/50 dark:bg-blue-700/30 px-3 py-1 rounded-full w-fit '>
      <MaterialIcons name="add" size={15} color={theme === 'dark' ? '#4b5563' : '#4b5563'} />
      <Text>{t("add_to_calendar")}</Text>
    </Pressable>
  )
}