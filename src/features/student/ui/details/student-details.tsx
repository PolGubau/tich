import React from 'react'
import { Image, Text, View } from 'react-native'
import { Student } from '~/domain/student/student'
import { MainLayout } from '~/shared/layouts/main-layout'

interface Props {
  student: Student
  // classes: Class[]
}
export default function StudentDetails({ student }: Props) {
  return (
    <MainLayout className='px-6'>
      <View accessibilityRole="header" className='flex-row items-center gap-6'>

        <Image
          source={{ uri: student.avatarUrl }}
          className='w-20 h-20 rounded-full bg-neutral-200'
          accessibilityLabel={`${student.name}'s avatar`}
          accessibilityRole="image"
        />
        <View>

          <Text className='text-xl font-bold'>{student.name}</Text>
          <Text>{student.email.value}</Text>
        </View>
      </View>


      <View className='mt-6'>
        <Text className='text-lg font-semibold'>Total de clases hechas</Text>
        <Text className='text-2xl font-bold'>{
          // ...
        }</Text>
      </View>
    </MainLayout>
  )
}