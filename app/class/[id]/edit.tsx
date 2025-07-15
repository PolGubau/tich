import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { ClassCreatePrimitive, ClassPrimitive } from '~/domain/class/types'
import { useClass } from '~/features/class/model/use-class'
import { CompleteClassForm } from '~/features/class/ui/add-form/complete-form'
import { t } from '~/shared/i18n/i18n'
import { MainLayout } from '~/shared/layouts/main-layout'

export default function CreateClass() {

  const { id } = useLocalSearchParams()
  const rawId = Array.isArray(id) ? id[0] : id

  if (!rawId || typeof rawId !== 'string') {
    console.error('Invalid class ID:', rawId)
    return (
      <>
        <Stack.Screen options={{ title: 'Invalid class ID' }} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-600">Class ID is missing or invalid</Text>
        </View>
      </>
    )
  }

  const classId = Number(rawId)


  if (classId === null || isNaN(classId)) {
    return (
      <>
        <Stack.Screen options={{ title: "Invalid class ID" }} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-600">Class ID is missing or invalid</Text>
        </View>
      </>
    )
  }


  const {
    class: data,
    update
  } = useClass(classId)



  if (!data) {
    return (<View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
      <Stack.Screen options={{ title: t("loading") }} />
      <ActivityIndicator size="large" />
    </View>)
  }



  const handleUpdate = (editableValues: ClassCreatePrimitive) => {
    const updatedClass: ClassPrimitive = {
      ...data,
      ...editableValues,
      id: classId, // Ensure the ID is set correctly
    }
    update(updatedClass)
  }



  return (<>
    <Stack.Screen
      options={{
        title: t("class_details")
      }}
    />
    <MainLayout className='flex-1 px-6'>

      <CompleteClassForm
        onSubmit={handleUpdate}
        initialValues={data} />
    </MainLayout></>)
}