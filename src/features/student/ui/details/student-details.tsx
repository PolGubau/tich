import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { Class } from '~/domain/class/class'
import { Student } from '~/domain/student/student'
import { ClassList } from '~/features/class/ui/list/class-list'
import { MainLayout } from '~/shared/layouts/main-layout'

interface Props {
  student: Student
  classes: Class[]
}
export default function StudentDetails({ student, classes }: Props) {
  return (
    <MainLayout className='px-6'>
      <View accessibilityRole="header" className='flex-row items-center gap-6'>

        <Image
          source={{ uri: student.avatarUrl }}
          className='w-20 h-20 rounded-full bg-neutral-200'
          accessibilityLabel={`${student.name.value}'s avatar`}
          accessibilityRole="image"
        />
        <View>

          <Text className='text-xl font-bold'>{student.name.value}</Text>
          <Text>{student.email.value}</Text>
          <Link href={{

            pathname: '/students/[id]/edit',
            params: { id: student.id.value }
          }} asChild>
            <Pressable className='flex-row items-center gap-1 pt-2'>
              <MaterialIcons name='edit' size={14} color='#2563eb' />

              <Text className=' text-blue-500'>
                Editar
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>


      <View className='mt-6'>
        <View className="flex-row justify-between items-center gap-1 mb-4">
          <Text className='text-lg font-semibold'>Clases hechas</Text>
          <Text>{`Total ${classes.length}`}</Text>
        </View>
        <ClassList classes={classes} />
      </View>


    </MainLayout >
  )
}