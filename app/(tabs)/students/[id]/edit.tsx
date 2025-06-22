import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { StudentCreatePrimitive, StudentPrimitive } from '~/domain/student/types'
import { useStudent } from '~/features/student/model/use-student'
import { StudentForm } from '~/features/student/ui/details/edit/student-form'
import { MainLayout } from '~/shared/layouts/main-layout'

export default function EditStudentScreen() {
  const { id } = useLocalSearchParams()

  const { student, update, studentStatus } = useStudent(id as string)

  const isRefreshing = studentStatus === 'loading'

  const handleUpdate = (oldValues: StudentPrimitive, newValues: StudentCreatePrimitive) => {
    // get all old values and merge with new values, new values should override old values
    const updatedValues: StudentPrimitive = {
      ...oldValues,
      ...newValues,
    }
    update(updatedValues)
  }

  if (!student) {
    return (
      <MainLayout>
        <Stack.Screen
          options={{
            title: "Loading...",
          }}
        />
        <View className='flex-1 items-center mt-28'>
          <ActivityIndicator size="large" />
        </View>
      </MainLayout>
    )
  }

  return (
    <MainLayout className='px-6 flex-1'>
      <Stack.Screen
        options={{
          title: "Edit",
        }}
      />
      <StudentForm initialValues={student.toPrimitive()} onSubmit={(newValues) => {
        handleUpdate(student.toPrimitive(), newValues)
      }} isLoading={isRefreshing} />
    </MainLayout>
  )
}