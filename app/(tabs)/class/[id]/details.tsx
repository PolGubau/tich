import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useClass } from '~/features/class/model/use-class'
import { MainLayout } from '~/shared/layouts/main-layout'
import { DeleteButton } from '~/shared/ui/delete-button'

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
    deleteClass
  } = useClass(classId)





  if (!data) {
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
      options={{
        title: "Class Details",
        headerShadowVisible: false,
        presentation: "pageSheet"
      }}
    />
    <MainLayout className='flex-1 px-6'>
      <Text className='text-xl'>
        Topic: {data?.topic}
      </Text>


      <Text className='text-lg mt-2'>
        Date: {data?.date.toLocaleDateString()}
      </Text>

      <Text className='text-lg mt-2'>
        Duration: {data?.durationMinutes} minutes
      </Text>

      <Text className='text-lg mt-2'>
        Notes: {data?.notes}
      </Text>

      <Text className='text-lg mt-2'>
        Student ID: {data?.studentId.value}
      </Text>

      <Text className='text-lg mt-2'>
        Is paid: {data?.isPaid}
      </Text>

      <Text className='text-lg mt-2'>
        Price: {data?.price.formattedValue}
      </Text>

      <Text className='text-lg mt-2'>
        createdAt: {data?.createdAt?.toLocaleTimeString()}
      </Text>

      <Text className='text-lg mt-2'>
        updatedAt: {data?.updatedAt?.toLocaleTimeString()}
      </Text>


      <View>
        <DeleteButton onDelete={deleteClass} deleteText="Eliminar clase"
          alertMessages={{
            message: "¿Seguro que quieres borrar esta clase? Esta acción no se puede deshacer.",
          }} />
      </View>

    </MainLayout>
  </>)
}