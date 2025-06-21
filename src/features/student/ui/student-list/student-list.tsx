import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link } from 'expo-router'
import React from 'react'
import { FlatList, Image, Pressable, RefreshControl, Text, View } from 'react-native'
import { StudentPrimitive } from '~/domain/student/types'


interface Props {
  students: StudentPrimitive[]
}
export function StudentList({ students }: Props) {
  return (
    <FlatList
      data={students}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            console.log('Refreshing...');  // Replace with actual refresh logic
          }}
        // colors={['#09f', '#f00']}
        />
      }
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Link href={`/student/${item.id}`} asChild>
          <Pressable android_ripple={{ color: "#aaa" }}  >
            <View className='p-4 border-b border-gray-200 flex justify-between items-center flex-row px-8'>
              <View className='flex-row flex flex-1 items-center'>
                <Image
                  source={{ uri: item.name }}
                  className='w-12 h-12 bg-neutral-200 rounded-full mr-4'
                />
                <View className=''>
                  <Text className='text-lg font-semibold'>{item.name}</Text>
                  <Text className='text-gray-500'>{item.email}</Text>
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