import { Stack } from 'expo-router'
import React from 'react'
import { useCreateStudent } from '~/features/student/model/use-create-student'
import { StudentForm } from '~/features/student/ui/details/edit/student-form'
import { MainLayout } from '~/shared/layouts/main-layout'

export default function CreateStudentScreen() {
  const { create, newStudent, status } = useCreateStudent()


  return (
    <MainLayout className='px-6 flex-1'>
      <Stack.Screen
        options={{
          title: "Create Student",
        }}
      />
      <StudentForm initialValues={newStudent} onSubmit={create} isLoading={status === 'loading'} />
    </MainLayout>
  )
}