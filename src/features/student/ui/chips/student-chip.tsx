import { View } from 'react-native'

import React from 'react'
import Avatar from '~/shared/components/Avatar'
import { Text } from '~/shared/components/Text'
import { useStudent } from '../../model/use-student'


interface Props {
  studentId: number
  className?: string
}

export default function StudentChip({ studentId, className }: Props) {
  const { student } = useStudent(studentId)
  if (!student) {
    return null
  }
  return (
    <View className={`flex-row items-center gap-2 ${className}`}>
      <Avatar avatarUrl={student.avatarUrl} className='w-6 h-6' iconSize={16} />
      <Text type='small'>{student.name}</Text>
    </View>
  )
}