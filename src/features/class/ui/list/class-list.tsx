import { Link } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { ClassPrimitive } from '~/domain/class/types'
import StudentChip from '~/features/student/ui/chips/student-chip'

type Props = {
  classes: ClassPrimitive[]
  showStudent?: boolean
}
export const ClassList = ({ classes, showStudent = true }: Props) => {

  return (
    <FlatList
      data={classes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const parsedDate = new Date(item.date).toLocaleDateString("es-ES")
        return (
          <Link href={{
            pathname: '/class/[id]/details',
            params: { id: item.id.toString() }
          }} asChild>

            <Pressable android_ripple={{ color: "#ddd" }} className="gap-4 py-2 border-b border-neutral-200 flex-row items-center justify-between px-4">
              <View className='flex-1 gap-1'>
                {showStudent && (
                  <StudentChip studentId={item.studentId} />
                )}
                <Text className="text-lg font-semibold pl-0.5">{item.topic}</Text>
                <Text className='line-clamp-3 pl-0.5'>{item.notes}</Text>
              </View>
              <View>

                <Text className="text-sm text-neutral-500">{parsedDate}</Text>
                <Text className="text-sm text-neutral-500">{item.durationMinutes} minutos</Text>
                <Text className="text-sm text-neutral-500">{item.price?.value}€</Text>
                {item.isPaid ? (
                  <Text className="text-sm text-green-500">Paid</Text>
                ) : (
                  <Text className="text-sm text-red-500">
                    Not paid
                  </Text>
                )}
              </View>
            </Pressable>

          </Link>
        )
      }}
    />
  )
}

