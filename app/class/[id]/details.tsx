import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Pressable, View } from 'react-native'
import { useClass } from '~/features/class/model/use-class'
import { AddCalendarButton } from '~/features/class/ui/add-calendar-button/add-calendar'
import Chip from '~/features/student/ui/chips/chip'
import { StudentChipLink } from '~/features/student/ui/chips/student-chip'
import { ErrorBoundary } from '~/shared/components/ErrorBoundary'
import { Text } from '~/shared/components/Text'
import { useColorScheme } from '~/shared/hooks/useColorScheme'
import { t } from '~/shared/i18n/i18n'
import { MainLayout } from '~/shared/layouts/main-layout'
import { DeleteButton } from '~/shared/ui/delete-button'
import { formatDate } from '~/shared/utils/dates/format-date'

export default function CreateClass() {

  const { id } = useLocalSearchParams()
  if (!id || typeof id !== 'string') {
    throw new Error("Invalid class ID")
  }

  const theme = useColorScheme()

  const classId = Number(id)



  const {
    class: data,
    error,
    liveStatus: status,
    deleteClass,
    metadata
  } = useClass(classId)



  // console.log(data, metadata)

  if (!data && status === "loading") {
    return <View>
      <Stack.Screen
        options={{
          title: t("loading"),
        }}
      />
      <View className='flex-1 items-center mt-28'>
        <ActivityIndicator size="large" />
      </View>
    </View>
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
          title: t("class_details")
        }}
      />
      <MainLayout className='flex-1 px-2'>

        <View className='flex-row gap-2 items-center px-2 mb-4'>
          <Text type="subtitle" numberOfLines={1}>
            {data?.topic}
          </Text>
        </View>
        <View className='flex-row items-center gap-4 mb-8'>

          <Link
            href={{
              pathname: './edit',
            }}
            asChild
          >
            <Pressable android_ripple={{ color: "#aaa" }}
              onPressIn={() => {
                impactAsync(ImpactFeedbackStyle.Light);
              }}
              className='flex-row items-center gap-1 bg-blue-50 dark:bg-blue-700/30 px-3 py-1 rounded-full'>
              <MaterialIcons name='edit' size={14} color='#2563eb' />

              <Text className='text-blue-500'>
                {t("edit")}
              </Text>
            </Pressable>
          </Link>
          <DeleteButton onDelete={deleteClass} />
        </View>



        <Text className='text-lg'>
          {data?.notes}
        </Text>

        <View className='border-t border-neutral-500/30 my-8 flex pt-4 items-center gap-2 flex-row flex-wrap'>
          <View className='flex-row items-center gap-2 flex-wrap mb-8'>

            <StudentChipLink studentId={data.studentId} className='border border-neutral-500/30 dark:border-neutral-700 p-1.5 rounded-full pr-2 ' />

            <Chip>
              <MaterialIcons name="calendar-today" size={15} color="#4b5563" />
              <Text>
                {data?.date ? formatDate(data?.date, {
                  hour: "2-digit",
                  minute: "2-digit",
                }) : "No date set"}
              </Text>
            </Chip>
            <Chip>
              <MaterialIcons name="attach-money" size={15} color="#4b5563" />
              <Text>
                {metadata?.price}
              </Text>
            </Chip>

            <Chip>
              <MaterialIcons name="access-time" size={15} color="#4b5563" />
              <Text>
                {metadata?.duration}
              </Text>
            </Chip>
            <Chip className={data.isPaid ? "border-green-500/50 bg-green-100 dark:bg-green-700/30" : "border-red-500/50 bg-red-100 dark:bg-red-700/30"}>
              <MaterialIcons name={data.isPaid ? "check" : "do-not-disturb"} size={15} color="#4b5563" />
              <Text>
                {data?.isPaid ? "Paid" : "Not paid"}
              </Text>
            </Chip>

          </View>

          <Chip className='border-0 gap-[5px]'>
            <MaterialIcons name="create" size={15} color="#4b5563" />
            <Text className='first-letter:uppercase opacity-80'>
              {t("created")}{` `}
              {metadata?.createdDaysAgo}
            </Text>
          </Chip>

          {data.createdAt < data.updatedAt && (
            <Chip className='border-0 gap-[5px]'>
              <MaterialIcons name="update" size={15} color="#4b5563" />
              <Text className='first-letter:uppercase opacity-80'>
                {t("updated")}{` `}
                {metadata?.updatedDaysAgo}
              </Text>
            </Chip>
          )}
        </View>

        <View className='px-2 flex-row items-center gap-2 mb-8'>
          <AddCalendarButton class={data} />
        </View>




      </MainLayout>
    </ErrorBoundary>
  </>)
}