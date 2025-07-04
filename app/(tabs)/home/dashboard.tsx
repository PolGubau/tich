import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useClasses } from '~/features/class/model/useClasses';
import { ClassList } from '~/features/class/ui/list/class-list';
import { useStudents } from '~/features/student/model/use-students';
import { MainLayout } from '~/shared/layouts/main-layout';

export default function DashboardScreen() {
  const { studentsAmount } = useStudents()
  const { totalClasses, totalHours, formattedEarnings, status, classes } = useClasses()




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




        {classes.length > 0 && <View className='gap-2 flex flex-col'>
          <Text className='text-xl px-2'>Your last classes</Text>
          <ClassList classes={classes} />
        </View>}


        {/* <Button onPress={deleteAllClasses} title="Delete all classes" color="#f87171" /> */}

        <View className='absolute bottom-6 left-6 right-6'>

          <Link href={{ pathname: "/class/create" }} asChild>
            <Pressable android_ripple={{ color: "#aaa" }}>
              <View className='p-4 px-6 border-b border-gray-200 flex gap-2 items-center flex-row rounded-xl bg-blue-500/30'>

                <MaterialIcons name="add" size={20} color="black" />

                <Text className='text-lg'>New Class </Text>

              </View>
            </Pressable>
          </Link>


        </View>
      </MainLayout>
    </>
  );
}
