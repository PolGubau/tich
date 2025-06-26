import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useClasses } from '~/features/class/model/useClasses';
import { useStudents } from '~/features/student/model/use-students';
import { MainLayout } from '~/shared/layouts/main-layout';

export default function DashboardScreen() {
  const { studentsAmount } = useStudents()
  const { totalClasses, totalHours, formattedEarnings } = useClasses()




  const dashboardItems = [
    { label: 'students', value: studentsAmount },
    { label: 'classes made', value: totalClasses },
    { label: 'hours taught', value: totalHours },
    { label: 'earnings', value: formattedEarnings },
  ]

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Dashboard',
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <MainLayout className='px-6'>
        <View className="flex-row flex-wrap -m-2">
          {dashboardItems.map((item, idx) => (
            <View key={idx} className="w-1/2 p-2">
              <View className="bg-blue-500/20 rounded-xl p-4">
                <Text className="text-3xl font-bold text-blue-500">{item.value}</Text>
                <Text className='capitalize'>{item.label}</Text>
              </View>
            </View>
          ))}
        </View>



        <Link href={"/home/create"} asChild>
          <Pressable className='flex-row items-center gap-1 pt-2 flex-1 rounded-full bg-blue'>
            <MaterialIcons name='add' size={14} color='#2563eb' />
            <Text className='text-blue-500'>Add</Text>
          </Pressable>
        </Link>
      </MainLayout>
    </>
  );
}
