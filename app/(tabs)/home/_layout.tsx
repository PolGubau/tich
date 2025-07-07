import { Stack } from 'expo-router';
import { t } from '~/shared/i18n/i18n';


export default function Layout() {

  return (

    <Stack screenOptions={{

      headerShadowVisible: false,
    }}>
      <Stack.Screen name="dashboard" options={{
        title: t("dashboard"),
        headerShown: true,
        headerShadowVisible: false
      }} />
    </Stack>

  );
}
