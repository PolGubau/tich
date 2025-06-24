import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "~/shared/styles/global.css";

export default function Layout() {

  return (

    <Stack screenOptions={{

      headerShadowVisible: false,
    }}>
      <Stack.Screen name="dashboard" options={{ headerTitle: 'Dashboard' }} />
      {/* <Stack.Screen name="[id]" options={{ headerShown: false }} /> */}
    </Stack>

  );
}
