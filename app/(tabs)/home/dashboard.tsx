import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { useClasses } from '~/features/class/model/useClasses';
import { ClassList } from '~/features/class/ui/list/class-list';
import { useStudents } from '~/features/student/model/use-students';
import { MainLayout } from '~/shared/layouts/main-layout';

export default function DashboardScreen() {
  const { studentsAmount } = useStudents()
  const { totalClasses, totalHours, formattedEarnings, status, classes, reload } = useClasses()




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
      <MainLayout className='px-6 h-full relative gap-10'>
        <View className="flex-row flex-wrap -m-2">
          {dashboardItems.map((item, idx) => (
            <View key={idx} className="w-1/2 p-2">
              <View className="bg-blue-500/20 rounded-xl p-4">
                <Text className="text-3xl font-bold text-blue-500">{item.value}</Text>
                {status === 'loading' ? (
                  <Text className="text-gray-500">Loading...</Text>
                ) : (
                  <Text className="text-gray-500 capitalize">{item.label}</Text>
                )}
              </View>
            </View>
          ))}
        </View>




        {classes.length > 0 && (
          <View className='gap-2 flex flex-col mb-48'>
            <Text className='text-xl px-2'>Your last classes</Text>
            <ClassList classes={classes} onReload={reload} isLoading={status === 'loading'} />
          </View>
        )}


        {/* <Button onPress={deleteAllClasses} title="Delete all classes" color="#f87171" /> */}
      </MainLayout>
    </>
  );
}
