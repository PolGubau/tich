import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { createEventInCalendarAsync, getDefaultCalendarAsync, requestCalendarPermissionsAsync } from 'expo-calendar'
import React from 'react'
import { Alert, Pressable } from 'react-native'
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

  /**
   * Adds a class to the user's calendar
   */
  const addClassToCalendar = async () => {
    if (!classData || !student?.name) return

    try {
      const { status } = await requestCalendarPermissionsAsync()
      if (status !== 'granted') {
        console.warn("Calendar permission denied")
        return
      }

      const calendar = await getDefaultCalendarAsync()
      if (!calendar?.id) throw new Error("No default calendar found")

      const endDate = new Date(classData.date)
      endDate.setMinutes(endDate.getMinutes() + classData.durationMinutes)

      const { action } = await createEventInCalendarAsync({
        calendarId: calendar.id,
        title: `${classData.topic} class for ${student.name}`,
        startDate: classData.date,
        endDate,
        creationDate: classData.createdAt,
        timeZone: "Europe/Madrid",
        notes: classData.notes,
      })

      console.log("Calendar event action:", action)
      if (action === 'done') {
        Alert.alert(t("success"), t("class_added_to_calendar"))
      }
    } catch (err) {
      console.error("Failed to add class to calendar:", err)
    }
  }

  return (
    <Pressable onPress={addClassToCalendar} className='flex-row items-center gap-2 bg-blue-400/50 dark:bg-blue-700/30 px-3 py-1 rounded-full w-fit '>
      <MaterialIcons name="add" size={15} color={theme === 'dark' ? '#4b5563' : '#4b5563'} />
      <Text>{t("add_to_calendar")}</Text>
    </Pressable>
  )
}