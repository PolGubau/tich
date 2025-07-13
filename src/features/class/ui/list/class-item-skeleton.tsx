import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { View } from 'react-native';
import { Text } from '~/shared/components/Text';

type Props = {
  showStudent?: boolean;
};
export default function ClassItemSkeleton({ showStudent }: Props) {
  return (


    <View className="gap-4 py-3 border-b border-neutral-400/30 flex-row items-center justify-between px-4">
      <View className='flex-1 gap-1'>
        {showStudent && (
          <View className='flex-row items-center gap-2'>
            {/* <StudentChipLink studentId={classData.studentId} /> */}
          </View>
        )}
        <Text customColor className="pl-0.5 rounded-full animate-pulse bg-neutral-500/50 text-transparent w-[60px]" type="defaultSemiBold" numberOfLines={1}>topic</Text>


        <Text className='pl-0.5 opacity-75 blur-md animate-pulse bg-neutral-500/50 text-transparent' customColor numberOfLines={2}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas voluptatibus reiciendis, accusantium sunt consectetur amet nobis ad ut impedit quae maxime, nam molestiae exercitationem architecto aliquam optio eveniet adipisci porro.</Text>
      </View>
      <View className='items-end gap-2 flex-col'>

        <Text type='small' className='first-letter:uppercase'>displayDate</Text>
        <Text type='small'>duration</Text>


        <View className='flex-row items-center gap-1'>

          <Text type='small'>PRICE</Text>

          <MaterialIcons name="cancel" size={16} color="#00000050" />

        </View>

      </View>
    </View>

  )

}