import { DATABASE_NAME } from 'db/utils';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import 'react-native-reanimated';
import * as schema from "~/../db/schema";
import migrations from '~/../drizzle/migrations';
import { ErrorBoundary } from '~/shared/components/ErrorBoundary';
import { useColorScheme } from '~/shared/hooks/useColorScheme';
import { MainLayout } from '~/shared/layouts/main-layout';
import "~/shared/styles/global.css";


ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.log('Global error handler:', error, isFatal);
  // Aquí puedes mostrar UI alternativa o reportar a un servicio
});
SplashScreen.preventAutoHideAsync();


const expoDb = openDatabaseSync(DATABASE_NAME)
export default function RootLayout() {


  const db = drizzle(expoDb, { schema });
  const colorScheme = useColorScheme();


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

  return (<Suspense fallback={<ActivityIndicator size={"large"} />}>
    <ErrorBoundary>

      <SQLiteProvider
        databaseName={DATABASE_NAME}
        useSuspense
        options={{ enableChangeListener: true }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="class" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      </SQLiteProvider>
    </ErrorBoundary>

  </Suspense>
  );
}
