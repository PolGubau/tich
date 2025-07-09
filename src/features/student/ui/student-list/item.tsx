import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'
import { StudentPrimitive } from '~/domain/student/types'
import { useClassByStudent } from '~/features/class/model/useClassByStudent'
import Avatar from '~/shared/components/Avatar'
import { Text } from '~/shared/components/Text'
import { useColorScheme } from '~/shared/hooks/useColorScheme'
import { t } from '~/shared/i18n/i18n'

type Props = {
  student: StudentPrimitive
}

export default function StudentListItem({ student }: Props) {
  const theme = useColorScheme()
  const { classesAmount } = useClassByStudent(student.id)

  return (
    <Link href={{ pathname: "/students/[id]/details", params: { id: student.id } }} asChild>
      <Pressable android_ripple={{ color: "#dddddd50" }}  >
        <View className='p-4 border-b border-neutral-300/30 flex justify-between items-center flex-row px-8'>
          <View className='flex-row flex flex-1 items-center gap-4 '>
            <Avatar avatarUrl={student.avatarUrl} className='w-[40px] h-[40px]' iconSize={28} />
            <View>
              <Text type="defaultSemiBold">{student.name}</Text>
              <Text type='small'>{student.email}</Text>
              <Text type='small'>{t("classes_done_amount", { count: classesAmount })}</Text>
            </View>
          </View>

          <View>

            <Text className='text-3xl'>
              <MaterialIcons name="arrow-forward" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
            </Text>
          </View>

        </View>
      </Pressable>
    </Link>
  )
}