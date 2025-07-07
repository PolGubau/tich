import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, RefreshControl, View } from 'react-native'
import { Student } from '~/domain/student/student'
import Avatar from '~/shared/components/Avatar'
import { Text } from '~/shared/components/Text'
import { useColorScheme } from '~/shared/hooks/useColorScheme'


interface Props {
  students: Student[]
  onRefresh?: () => void
  isLoading: boolean

}
export function StudentList({ students, onRefresh, isLoading }: Props) {
  const theme = useColorScheme()

  return (
    <FlatList
      data={students}
      refreshControl={
        <RefreshControl
          enabled={!!onRefresh}
          refreshing={isLoading}
          progressBackgroundColor={theme === 'dark' ? '#333' : '#fff'}
          colors={theme === 'dark' ? ['#fff'] : ['#000']}
          onRefresh={onRefresh} />
      }
      keyExtractor={item => item.id.value.toString()}
      renderItem={({ item }) => (
        <Link href={{ pathname: "/students/[id]/details", params: { id: item.id.value } }} asChild>
          <Pressable android_ripple={{ color: "#dddddd50" }}  >
            <View className='p-4 border-b border-neutral-300/30 flex justify-between items-center flex-row px-8'>
              <View className='flex-row flex flex-1 items-center gap-4 '>
                <Avatar avatarUrl={item.avatarUrl} className='w-[40px] h-[40px]' iconSize={28} />
                <View>
                  <Text type="defaultSemiBold">{item.name.value}</Text>
                  <Text className='opacity-60'>{item.email.value}</Text>
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
      )}
    />
  )
}