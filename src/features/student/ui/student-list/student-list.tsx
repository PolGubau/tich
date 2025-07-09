import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { Student } from '~/domain/student/student'
import { useColorScheme } from '~/shared/hooks/useColorScheme'
import StudentListItem from './item'
import { StudentPrimitive } from '~/domain/student/types'


interface Props {
  students: StudentPrimitive[]
  onRefresh?: () => void
  isLoading: boolean

}
export function StudentList({ students, onRefresh, isLoading }: Props) {
  const theme = useColorScheme()

  return (
    <FlatList
      data={students}
      refreshControl={
        <RefreshControl
          enabled={!!onRefresh}
          refreshing={isLoading}
          progressBackgroundColor={theme === 'dark' ? '#333' : '#fff'}
          colors={theme === 'dark' ? ['#fff'] : ['#000']}
          onRefresh={onRefresh} />
      }
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <StudentListItem student={item} />}
    />
  )
}