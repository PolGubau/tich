import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useStudent } from '~/features/student/model/useStudent'
import StudentDetails from '~/features/student/ui/details/student-details'

export default function DetailsScreen() {
  const { id } = useLocalSearchParams()

  const { student, classes } = useStudent(id as string)
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
        }}
      />
      <StudentDetails student={student} classes={classes} />

    </View>
  )
}