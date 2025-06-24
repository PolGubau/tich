import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link } from 'expo-router'
import React from 'react'
import { FlatList, Image, Pressable, RefreshControl, Text, View } from 'react-native'
import { Student } from '~/domain/student/student'


interface Props {
  students: Student[]
  onRefresh?: () => void
  isLoading: boolean

}
export function StudentList({ students, onRefresh, isLoading }: Props) {
  return (
    <FlatList
      data={students}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
        />
      }
      keyExtractor={item => item.id.value.toString()}
      renderItem={({ item }) => (
        <Link href={{ pathname: "/students/[id]/details", params: { id: item.id.value } }} asChild>
          <Pressable android_ripple={{ color: "#aaa" }}  >
            <View className='p-4 border-b border-gray-200 flex justify-between items-center flex-row px-8'>
              <View className='flex-row flex flex-1 items-center'>
                <Image
                  source={{ uri: item.avatarUrl ?? undefined }}
                  className='w-12 h-12 bg-neutral-200 rounded-full mr-4'
                />
                <View className=''>
                  <Text className='text-lg font-semibold'>{item.name.value}</Text>
                  <Text className='text-gray-500'>{item.email.value}</Text>
                </View>
              </View>

              <View>

                <Text className='text-3xl'>
                  <MaterialIcons name="arrow-forward" size={24} color="black" />
                </Text>
              </View>

            </View>
          </Pressable>
        </Link>
      )}
    />
  )
}