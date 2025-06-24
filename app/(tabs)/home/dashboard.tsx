import { Stack } from 'expo-router';
import { Text } from 'react-native';
import { useClasses } from '~/features/class/model/useClasses';
import { useStudents } from '~/features/student/model/use-students';
import { MainLayout } from '~/shared/layouts/main-layout';

export default function DashboardScreen() {
  const { studentsAmount } = useStudents()
  const { totalClasses, totalHours, moneyEarned } = useClasses()
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

        <Text className="">Active students: {studentsAmount}</Text>
        <Text className="">Total classes: {totalClasses}</Text>
        <Text className="">Total hours: {totalHours}</Text>
        <Text className="">Total Money earned: {moneyEarned}</Text>


      </MainLayout>
    </>
  );
}
