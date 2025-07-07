import { Stack } from 'expo-router';


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
    </Stack>
  );
}
