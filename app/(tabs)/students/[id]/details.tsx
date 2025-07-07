import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Pressable, View } from 'react-native'
import { useClassByStudent } from '~/features/class/model/useClassByStudent'
import { useStudent } from '~/features/student/model/use-student'
import StudentDetails from '~/features/student/ui/details/details'
import { t } from '~/shared/i18n/i18n'
import { MainLayout } from '~/shared/layouts/main-layout'

export default function DetailsScreen() {
  const { id } = useLocalSearchParams()

  const { student, delete: deleteStudent } = useStudent(Number(id))
  const { classes, reload, status: classesStatus } = useClassByStudent(Number(id))

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
    <MainLayout>
      <Stack.Screen
        options={{
          title: t("details_of_student", { name: student.name }),
          headerRight() {
            return (
              <View className='flex-row items-center gap-2 pr-2'>
                <Link href={{
                  pathname: '/students/[id]/add-class',
                  params: { id: student.id }
                }} asChild>
                  <Pressable onPressIn={() => {
                    impactAsync(ImpactFeedbackStyle.Light);
                  }}
                    className='flex-row items-center gap-1'>
                    <MaterialIcons name='add' size={24} />
                  </Pressable>
                </Link>
              </View>
            )
          },
        }}
      />
      <StudentDetails onReload={reload} areClassesLoading={classesStatus === "loading"} student={student} classes={classes} onDelete={deleteStudent} />

    </MainLayout>
  )
}