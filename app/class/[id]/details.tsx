import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { useClass } from '~/features/class/model/use-class'
import StudentChip from '~/features/student/ui/chips/student-chip'
import { ErrorBoundary } from '~/shared/components/ErrorBoundary'
import { MainLayout } from '~/shared/layouts/main-layout'
import { DeleteButton } from '~/shared/ui/delete-button'
import { formatDate } from '~/shared/utils/dates/format-date'

export default function CreateClass() {

  const { id } = useLocalSearchParams()
  if (!id || typeof id !== 'string') {
    throw new Error("Invalid class ID")
  }


  const classId = Number(id)



  const {
    class: data,
    error,
    liveStatus: status,
    deleteClass
  } = useClass(classId)



  if (!data && status === "loading") {
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

  if (error) {
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
  if (!data) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "This class does not exist",
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


  return (<>
    <ErrorBoundary>
      <Stack.Screen
        options={{
          title: "Class Details",

        }}
      />
      <MainLayout className='flex-1 px-6'>

        <View className='flex-row items-center gap-2'>
          <Text className='text-2xl'>
            {data?.topic}
          </Text>
        </View>
        <View className='flex-row items-center gap-4 pt-2 pb-8'>

          <Link
            href={{
              pathname: './edit',
            }}
            asChild
          >
            <Pressable
              onPressIn={() => {
                impactAsync(ImpactFeedbackStyle.Light);
              }}
              className='flex-row items-center gap-1 pt-2'>
              <MaterialIcons name='edit' size={14} color='#2563eb' />

              <Text className='text-blue-500'>
                Edit
              </Text>
            </Pressable>
          </Link>
          <DeleteButton onDelete={deleteClass} deleteText="Eliminar clase"
            alertMessages={{
              message: "¿Seguro que quieres borrar esta clase? Esta acción no se puede deshacer.",
            }} />
        </View>


        <StudentChip studentId={data.studentId} />

        <Text className='text-lg mt-2'>
          Date: {data?.date ? formatDate(data?.date) : "No date set"}
        </Text>

        <Text className='text-lg mt-2'>
          Duration: {data?.durationMinutes} minutes
        </Text>

        <Text className='text-lg mt-2'>
          Notes: {data?.notes}
        </Text>



        <Text className='text-lg mt-2'>
          Is paid: {data?.isPaid.toString()}
        </Text>

        <Text className='text-lg mt-2'>
          Price: {data?.price.value} {data?.price.currency}
        </Text>

        <Text className='text-lg mt-2'>
          createdAt: {data?.createdAt?.toLocaleTimeString()}
        </Text>

        <Text className='text-lg mt-2'>
          updatedAt: {data?.updatedAt?.toLocaleTimeString()}
        </Text>




      </MainLayout>
    </ErrorBoundary>
  </>)
}