import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { Pressable } from 'react-native'
import { ClassPrimitive } from '~/domain/class/types'
import { useStudent } from '~/features/student/model/use-student'
import { Text } from '~/shared/components/Text'
import { useColorScheme } from '~/shared/hooks/useColorScheme'
import { t } from '~/shared/i18n/i18n'
import { addEventToCalendar } from '~/shared/utils/calendar/addEventToCalendar'



type Props = {
  class: ClassPrimitive
}
export function AddCalendarButton({ class: classData }: Props) {
  const theme = useColorScheme()
  const { student } = useStudent(classData.studentId)

  const addClassToCalendar = async () => {
    if (!classData || !student?.name) return

    addEventToCalendar({
      url: `class/${classData.id}/details`,
      title: t("class_calendar_title", { topic: classData.topic, student: student.name }),
      startDate: new Date(classData.date),
      endDate: new Date(new Date(classData.date).getTime() + classData.durationMinutes * 60000),
      notes: classData.notes,

    })
  }

  return (
    <Pressable onPress={addClassToCalendar} className='flex-row items-center gap-2 bg-blue-400/50 dark:bg-blue-700/30 px-3 py-1 rounded-full w-fit '>
      <MaterialIcons name="add" size={15} color={theme === 'dark' ? '#aaa' : '#4b5563'} />
      <Text>{t("add_to_calendar")}</Text>
    </Pressable>
  )
}

