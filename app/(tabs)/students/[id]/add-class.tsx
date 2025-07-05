import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ClassCreatePrimitive, PartialClassWithDefinedStudent } from "~/domain/class/types"
import { useCreateClass } from '~/features/class/model/use-create-class'
import { BaseClassForm } from '~/features/class/ui/add-form/base-form'
import { useStudent } from '~/features/student/model/use-student'
import { MainLayout } from '~/shared/layouts/main-layout'

export default function AddClass() {
  const { id } = useLocalSearchParams()
  if (!id || typeof id !== 'string') {
    throw new Error("Invalid student ID")
  }
  const { student } = useStudent(Number(id))
  const { create, emptyClass, status } = useCreateClass()

  const handleCreate = (newValues: PartialClassWithDefinedStudent) => {
    if (!id) {
      console.error("Student ID is required");
      return;
    }
    const newCreateClass: ClassCreatePrimitive = {
      ...emptyClass,
      ...newValues,
      studentId: Number(id),
    }
    create(newCreateClass)
  }



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

  return (<>
    <Stack.Screen
      options={{ title: `Add class to ${student.name}` }}
    />
    <MainLayout className='px-6 flex-1'>
      <BaseClassForm initialValues={emptyClass} onSubmit={handleCreate} isLoading={status === "loading"} />
    </MainLayout></>
  )
}