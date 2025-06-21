import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "~/shared/styles/global.css";

export default function Layout() {

  return (

    <Stack>
      <Stack.Screen name="list" options={{
        headerShown: false,

      }} />
      <Stack.Screen name="details" />
    </Stack>

  );
}
