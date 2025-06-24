import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "~/shared/styles/global.css";

export default function Layout() {
  return (
    <Stack screenOptions={{
      headerShadowVisible: false
    }}>
      <Stack.Screen name="details" options={{
        title: 'Student Details',
      }} />
      <Stack.Screen name="edit" options={{
        title: 'Edit Student',
      }} />
      <Stack.Screen name="add-class" />
    </Stack>
  );
}
