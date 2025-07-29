import { MaterialIcons } from '@expo/vector-icons'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React, { useMemo } from 'react'
import { Pressable, View } from 'react-native'
import { StudentCreatePrimitive } from '~/domain/student/types'
import { useCreateStudent } from '~/features/student/model/use-create-student'
import { StudentForm } from '~/features/student/ui/details/edit/student-form'
import { Text } from '~/shared/components/Text'
import { useColorScheme } from '~/shared/hooks/useColorScheme'
import { t } from '~/shared/i18n/i18n'
import { MainLayout } from '~/shared/layouts/main-layout'
export default function CreateStudentScreen() {

  const theme = useColorScheme()

  const { contactName, contactEmail, avatarUrl } = useLocalSearchParams<{
    contactName?: string;
    contactEmail?: string;
    avatarUrl?: string;
  }>();

  const initialData: StudentCreatePrimitive = useMemo(() => ({
    ...newStudent,
    name: contactName ?? '',
    email: contactEmail ?? '',
    avatarUrl: avatarUrl ?? '',
  }), [contactName, contactEmail, avatarUrl]);

  const { create, newStudent, status } = useCreateStudent()


  return (
    <MainLayout className='px-2'>
      <Stack.Screen
        options={{
          title: t("new_student"),
        }}
      />

      <View className='flex flex-row items-center gap-2 my-4'>
      <Link asChild href="./modal" className=''>
        <Pressable android_ripple={{ color: "#dddddd50" }} className='p-3 px-4 bg-neutral-500/30 flex gap-2 items-center flex-row rounded-xl w-fit'>
              <MaterialIcons name="people" size={18} color={theme === 'dark' ? 'white' : 'black'} />
            <Text>{t("prefill_with_contact")}</Text>
        </Pressable>
      </Link>
      </View> 

      <StudentForm initialValues={initialData} onSubmit={create} isLoading={status === 'loading'} />
    </MainLayout>
  )
}