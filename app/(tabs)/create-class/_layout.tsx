import { Stack } from 'expo-router';
import { t } from '~/shared/i18n/i18n';
import "~/shared/styles/global.css";

export default function Layout() {

  return (

    <Stack screenOptions={{

      headerShadowVisible: false,
    }}>
      <Stack.Screen name="index" options={{ headerTitle: t("create_class") }} />
    </Stack>

  );
}
