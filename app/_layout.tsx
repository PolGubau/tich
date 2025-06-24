import { DATABASE_NAME, db } from 'db/utils';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text } from 'react-native';
import 'react-native-reanimated';
import migrations from '~/../drizzle/migrations';
import { MainLayout } from '~/shared/layouts/main-layout';
import "~/shared/styles/global.css";


SplashScreen.preventAutoHideAsync();


export default function RootLayout() {




  const { success, error: dbError } = useMigrations(db, migrations);

  // const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (dbError) {
    return (
      <MainLayout>
        <Text>Migration error: {dbError.message}</Text>
      </MainLayout>
    );
  }
  if (!success) {
    return (
      <MainLayout>
        <Text>Migration is in progress...</Text>
      </MainLayout>
    );
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
    >
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </SQLiteProvider>

  );
}
