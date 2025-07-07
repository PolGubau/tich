import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, RefreshControl, View } from 'react-native'
import { ClassPrimitive } from '~/domain/class/types'
import StudentChip from '~/features/student/ui/chips/student-chip'
import { Text } from '~/shared/components/Text'
import { getLocaleClassData } from '../../model/get-locale-class-data'

type Props = {
  classes: ClassPrimitive[]
  showStudent?: boolean
  onReload?: () => void
  isLoading?: boolean
}
export const ClassList = ({ classes, showStudent = true, onReload, isLoading = false }: Props) => {

  return (
    <FlatList
      data={classes}
      refreshControl={
        <RefreshControl
          enabled={!!onReload}
          refreshing={isLoading}
          onRefresh={onReload}
        />
      }
      ListFooterComponent={() => (
        isLoading ? (
          <View className='flex-1 items-center mt-4'>
            <MaterialIcons name="hourglass-top" size={24} color="#00000080" />
          </View>
        ) : <View className='px-4 py-1 mt-4'>
          <Text>{`Total ${classes.length}`}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const parsedDate = new Date(item.date).toLocaleDateString("es-ES")
        const metadata = getLocaleClassData(item);
        return (
          <Link href={{
            pathname: '/class/[id]/details',
            params: { id: item.id.toString() }
          }} asChild>

            <Pressable android_ripple={{ color: "#dddddd50" }} className="gap-4 py-3 border-b border-neutral-400/30 flex-row items-center justify-between px-4">
              <View className='flex-1 gap-1'>
                {showStudent && (
                  <StudentChip studentId={item.studentId} />
                )}
                <Text className="pl-0.5" type="defaultSemiBold" numberOfLines={1}>{item.topic}</Text>
                <Text className='pl-0.5 opacity-75' numberOfLines={2}>{item.notes}</Text>
              </View>
              <View className='items-end gap-2 flex-col'>

                <Text type='small'>{parsedDate}</Text>
                <Text type='small'>{metadata.duration}</Text>


                <View className='flex-row items-center gap-1'>

                  <Text type='small'>{metadata.price}</Text>
                  {item.isPaid ? (
                    <MaterialIcons name="check-circle" size={16} color="#00ff0080" />
                  ) : (
                    <MaterialIcons name="cancel" size={16} color="#ff000080" />
                  )}
                </View>

              </View>
            </Pressable>

          </Link>
        )
      }}
    />
  )
}

