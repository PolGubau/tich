import { Stack } from 'expo-router';
import { t } from '~/shared/i18n/i18n';

export default function Layout() {

  return (

    <Stack screenOptions={{
      animation: "fade",
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="list" options={{
        headerTitle: t("students"),
      }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>

  );
}
