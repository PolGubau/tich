import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "~/shared/styles/global.css";

export default function Layout() {

  return (

    <Stack>
      <Stack.Screen name="details" options={{
        // headerShown: false,
        headerShadowVisible: false,
        title: 'Student Details',
      }} />
      <Stack.Screen name="edit" options={{
        headerShadowVisible: false,
        title: 'Edit Student',
      }} />
    </Stack>

  );
}
