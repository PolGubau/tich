import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { ClassPrimitive } from '~/domain/class/types'
import { StudentPrimitive } from '~/domain/student/types'
import { ClassList } from '~/features/class/ui/list/class-list'
import { MainLayout } from '~/shared/layouts/main-layout'
import { DeleteStudentButton } from './student-delete-button'

interface Props {
  student: StudentPrimitive
  onDelete: () => void
  classes: ClassPrimitive[]
}
export default function StudentDetails({ student, classes, onDelete }: Props) {
  return (
    <MainLayout className=''>
      <View accessibilityRole="header" className='px-6 flex-row items-center gap-6'>

        <Image
          source={{ uri: student.avatarUrl ?? undefined }}
          className='w-20 h-20 rounded-full bg-neutral-200'
          accessibilityLabel={`${student.name}'s avatar`}
          accessibilityRole="image"
        />
        <View>

          <Text className='text-xl font-bold'>{student.name}</Text>
          <Text>{student.email}</Text>


          <View className='flex-row items-center gap-4 pt-2'>
            <Link href={{

              pathname: '/students/[id]/edit',
              params: { id: student.id }
            }} asChild>
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
            <DeleteStudentButton onDelete={onDelete} />
          </View>
        </View>
      </View>


      <View className='mt-6'>
        <View className="px-6 flex-row justify-between items-center gap-1 mb-4">
          <Text className='text-lg font-semibold'>Done classes</Text>
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
              <Text className='text-blue-500'>Add</Text>
            </Pressable>
          </Link>
        </View>
        <ClassList classes={classes} showStudent={false} />

        <View className='px-6 py-2 mt-4'>
          <Text>{`Total ${classes.length}`}</Text>
        </View>
      </View>


    </MainLayout>
  )
}