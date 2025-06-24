import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Pressable, View } from 'react-native'
import { useStudent } from '~/features/student/model/use-student'
import StudentDetails from '~/features/student/ui/details/student-details'

export default function DetailsScreen() {
  const { id } = useLocalSearchParams()

  const { student, classes, deleteStudent } = useStudent(Number(id))
  if (!student) {
    return (
      <View>
        <Stack.Screen
          options={{
            title: "Loading...",
          }}
        />
        <View className='flex-1 items-center mt-28'>
          <ActivityIndicator size="large" />
        </View>
      </View>
    )
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Details",
          headerRight() {
            return (
              <View className='flex-row items-center gap-2 pr-2'>
                <Link href={{
                  pathname: '/students/[id]/add-class',
                  params: { id: student.id.value }
                }} asChild>
                  <Pressable className='flex-row items-center gap-1'>
                    <MaterialIcons name='add' size={24} />
                  </Pressable>
                </Link>
              </View>
            )
          },
        }}
      />
      <StudentDetails student={student} classes={classes} onDelete={deleteStudent} />

    </View>
  )
}