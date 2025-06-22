
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { ActivityIndicator, NativeSyntheticEvent, Pressable, Text, TextInputChangeEventData, View } from 'react-native';
import { useStudents } from '~/features/student/model/use-students';
import { StudentList } from '~/features/student/ui/student-list/student-list';
import { MainLayout } from '~/shared/layouts/main-layout';
export default function StudentsScreen() {
  const { students, reload, status, setQuery } = useStudents();

  const isInitialLoading = status === 'loading' && students.length === 0
  const isRefreshing = status === 'loading' && students.length > 0

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({

      headerSearchBarOptions: {
        placeholder: "Buscar estudiante",
        onCancel: () => setQuery(""),
        onChangeText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => setQuery(e.nativeEvent.text),
        hideWhenScrolling: true,
      },
    })
  }, [navigation])


  if (isInitialLoading) {
    return (
      <MainLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </MainLayout>
    )
  }
  return (

    <MainLayout>
      <Link href={{ pathname: "/students/create" }} asChild>
        <Pressable android_ripple={{ color: "#aaa" }}  >
          <View className='p-4 border-b border-gray-200 flex justify-between items-center flex-row px-8'>
            <Text className='text-xl'>New Student</Text>

            <View>

              <Text className='text-3xl'>
                <MaterialIcons name="add" size={24} color="black" />
              </Text>
            </View>

          </View>
        </Pressable>
      </Link>
      <StudentList students={students} onRefresh={reload} isLoading={isRefreshing} />
    </MainLayout>

  );
}