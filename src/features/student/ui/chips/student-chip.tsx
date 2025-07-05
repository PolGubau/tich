import { Image, Text, View } from 'react-native'

import React from 'react'
import { useStudent } from '../../model/use-student'


interface Props {
  studentId: number
}

export default function StudentChip({ studentId }: Props) {
  const { student } = useStudent(studentId)
  if (!student) {
    return null
  }
  return (
    <View className='flex-row items-center gap-2'>
      {student.avatarUrl ? <Image
        source={{ uri: student.avatarUrl }}
        className='w-6 h-6 rounded-full bg-neutral-200'

        accessibilityLabel={`${student.name}'s avatar`}
        accessibilityRole="image"
      /> : <View className='w-6 h-6 rounded-full bg-neutral-200' />}

      <Text>{student.name}</Text>
    </View>
  )
}