import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { FlatList, View } from 'react-native'
import { ClassPrimitive } from '~/domain/class/types'
import { Text } from '~/shared/components/Text'
import { t } from '~/shared/i18n/i18n'
import { ClassDraggableItem } from './class-draggable-item'
import ClassItem from './class-item'

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
      onRefresh={onReload}

      refreshing={isLoading}
      ListFooterComponent={() => (
        isLoading ? (
          <View className='flex-1 items-center mt-4'>
            <MaterialIcons name="hourglass-top" size={24} color="#00000080" />
          </View>
        ) : <View className='px-4 py-1 mt-4'>
          <Text>{`${t("total")} ${classes.length}`}</Text>
        </View>
      )}
      StickyHeaderComponent={() => (
        <View className='px-4 py-2 bg-white dark:bg-neutral-900'>
          <Text type="defaultSemiBold">{t("last_classes")}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ClassDraggableItem isPaid={item.isPaid} onSwipeRight={() => console.log('Swiped right:', item.id)}>
        <ClassItem classData={item} showStudent={showStudent} />
      </ClassDraggableItem>}

    />
  )
}

