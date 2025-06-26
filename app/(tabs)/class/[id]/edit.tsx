import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { ClassCreatePrimitive, ClassPrimitive } from '~/domain/class/types'
import { useClass } from '~/features/class/model/use-class'
import { CompleteClassForm } from '~/features/class/ui/add-form/complete-form'
import { MainLayout } from '~/shared/layouts/main-layout'

export default function CreateClass() {

  const { id } = useLocalSearchParams()
  if (!id || typeof id !== 'string') {
    throw new Error("Invalid class ID")
  }
  const classId = Number(id)


  const {
    class: data,
    status,
    error,
    update
  } = useClass(classId)



  if (!data) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Ups...",
          }}
        />
        <View className='flex-1 items-center mt-28'>
          <Text className='text-red-500 text-center'>
            {error || "Class not found"}
          </Text>

        </View>
      </>
    )
  }

  const handleUpdate = (editableValues: ClassCreatePrimitive) => {
    const updatedClass: ClassPrimitive = {
      ...data.toPrimitive(),
      ...editableValues,
      id: classId, // Ensure the ID is set correctly
    }
    update(updatedClass)
  }



  return (<>
    <Stack.Screen
      options={{
        title: "Class Details",
        headerShadowVisible: false,
        presentation: "pageSheet"
      }}
    />
    <MainLayout className='flex-1 px-6'>
      <CompleteClassForm
        onSubmit={handleUpdate}
        initialValues={data.toPrimitive()}
        isLoading={status === "loading"} />
    </MainLayout>
  </>)
}