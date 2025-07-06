import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useClass } from '~/features/class/model/use-class'
import Chip from '~/features/student/ui/chips/chip'
import StudentChip from '~/features/student/ui/chips/student-chip'
import { ErrorBoundary } from '~/shared/components/ErrorBoundary'
import LoadingPage from '~/shared/components/loading-page'
import i18n, { t } from '~/shared/i18n/i18n'
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
    deleteClass, metadata
  } = useClass(classId)



  if (!data && status === "loading") {
    return <LoadingPage />
  }

  if (!data || error) {
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
          title: t("classDetails")

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
                {t("edit")}
              </Text>
            </Pressable>
          </Link>
          <DeleteButton onDelete={deleteClass} deleteText={i18n.t("delete")} />
        </View>

        <View className='flex-row items-center gap-2 flex-wrap'>

          <StudentChip studentId={data.studentId} className='border border-neutral-500/30 p-1 rounded-full pr-2' />

          <Chip>
            <MaterialIcons name="calendar-today" size={15} color="#4b5563" />
            <Text>
              {data?.date ? formatDate(data?.date) : "No date set"}
            </Text>
          </Chip>
          <Chip>
            <MaterialIcons name="attach-money" size={15} color="#4b5563" />
            <Text>
              {metadata.price}
            </Text>
          </Chip>

          <Chip>
            <MaterialIcons name="access-time" size={15} color="#4b5563" />
            <Text>
              {metadata.duration}
            </Text>
          </Chip>
          <Chip className={data.isPaid ? "border-green-500 bg-green-100" : "border-red-500 bg-red-100"}>
            <MaterialIcons name={data.isPaid ? "check" : "do-not-disturb"} size={15} color="#4b5563" />
            <Text>
              {data?.isPaid ? "Paid" : "Not paid"}
            </Text>
          </Chip>

        </View>


        <Text className='text-lg mt-8'>
          {data?.notes}
        </Text>

        <View className='border-t border-neutral-500/30 mt-8 pt-4 flex items-center gap-2 flex-row flex-wrap'>


          <Chip>
            <MaterialIcons name="create" size={15} color="#4b5563" />
            <Text className='first-letter:uppercase'>
              {metadata.createdDaysAgo}
            </Text>
          </Chip>

          {data.createdAt < data.updatedAt && (
            <Chip>
              <MaterialIcons name="update" size={15} color="#4b5563" />
              <Text className='first-letter:uppercase'>
                {metadata.updatedDaysAgo}
              </Text>
            </Chip>
          )}
        </View>




      </MainLayout>
    </ErrorBoundary>
  </>)
}