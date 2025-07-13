import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import { ClassPrimitive } from '~/domain/class/types';
import { StudentChipLink } from '~/features/student/ui/chips/student-chip';
import { Text } from '~/shared/components/Text';
import { useColorScheme } from '~/shared/hooks/useColorScheme';
import { getLocaleClassData } from '../../model/get-locale-class-data';

type Props = {
  classData: ClassPrimitive;
  showStudent?: boolean;
};
export default function ClassItem({ classData, showStudent }: Props) {
  const metadata = getLocaleClassData(classData);
  const colorScheme = useColorScheme();

  return (
    <Link href={{
      pathname: '/class/[id]/details',
      params: { id: classData.id.toString() }
    }} asChild>

      <Pressable style={{ backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background }} android_ripple={{ color: "#dddddd50" }} className="gap-4 py-3 flex-row items-center justify-between px-4">
        <View className='flex-1 gap-1'>
          {showStudent && (
            <View className='flex-row items-center gap-2'>
              <StudentChipLink studentId={classData.studentId} />
            </View>
          )}
          <Text className="pl-0.5" type="defaultSemiBold" numberOfLines={1}>{classData.topic}</Text>
          <Text className='pl-0.5 opacity-75' numberOfLines={2}>{classData.notes}</Text>
        </View>
        <View className='items-end gap-2 flex-col'>

          <Text type='small' className='first-letter:uppercase'>{metadata.displayDate}</Text>
          <Text type='small'>{metadata.duration}</Text>


          <View className='flex-row items-center gap-1'>

            <Text type='small'>{metadata.price}</Text>
            {classData.isPaid ? (
              <MaterialIcons name="check-circle" size={16} color="#00ff0080" />
            ) : (
              <MaterialIcons name="cancel" size={16} color="#ff000080" />
            )}
          </View>

        </View>
      </Pressable>

    </Link>
  )

}