import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { Link } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'
import { ClassPrimitive } from '~/domain/class/types'
import { StudentPrimitive } from '~/domain/student/types'
import { ClassList } from '~/features/class/ui/list/class-list'
import Avatar from '~/shared/components/Avatar'
import { Text } from '~/shared/components/Text'
import { t } from '~/shared/i18n/i18n'
import { DeleteStudentButton } from './student-delete-button'

interface Props {
  student: StudentPrimitive
  onDelete: () => void
  onReload?: () => void
  classes: ClassPrimitive[]
  areClassesLoading: boolean
}
export default function StudentDetails({ student, classes, onDelete, onReload, areClassesLoading }: Props) {
  return (
    <>
      <View accessibilityRole="header" className='px-6 flex-row items-center gap-6'>

        <Avatar avatarUrl={student.avatarUrl} className='w-[50px] h-[50px]' iconSize={30} />

        <View>

          <Text type='subtitle'>{student.name}</Text>
          <Text type='small'>{student.email}</Text>


          <View className='flex-row items-center gap-4 pt-3'>
            <Link href={{

              pathname: '/students/[id]/edit',
              params: { id: student.id }
            }} asChild>
              <Pressable
                onPressIn={() => {
                  impactAsync(ImpactFeedbackStyle.Light);
                }}
                className='flex-row items-center gap-1'>
                <MaterialIcons name='edit' size={14} color='#2563eb' />

                <Text customColor className='text-blue-500'>
                  {t("edit")}
                </Text>
              </Pressable>
            </Link>
            <DeleteStudentButton onDelete={onDelete} />
          </View>
        </View>
      </View>


      <View className='mt-8 mb-20'>
        <View className="px-4 flex-row justify-between items-center gap-1 mb-4">
          <Text type="defaultSemiBold">{t("last_classes_done")}</Text>
          <Link href={{
            pathname: '/students/[id]/add-class',
            params: { id: student.id }
          }} asChild>
            <Pressable
              onPressIn={() => {
                impactAsync(ImpactFeedbackStyle.Light);
              }}
              className='flex-row items-center gap-1 pt-2'>
              <MaterialIcons name='add' size={14} color='#2563eb' />
              <Text className='text-blue-500'>{t("create_class")}</Text>
            </Pressable>
          </Link>
        </View>
        <ClassList isLoading={areClassesLoading} classes={classes} showStudent={false} onReload={onReload} />
      </View>

    </>

  )
}