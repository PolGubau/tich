import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { DATABASE_NAME } from 'db/utils'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite'
import { StatusBar } from 'expo-status-bar'
import { Suspense, useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import 'react-native-gesture-handler'
import 'react-native-reanimated'

import * as schema from '~/../db/schema'
import migrations from '~/../drizzle/migrations'
import { ErrorBoundary } from '~/shared/components/ErrorBoundary'
import { Text } from '~/shared/components/Text'
import { useColorScheme } from '~/shared/hooks/useColorScheme'
import { MainLayout } from '~/shared/layouts/main-layout'
import '~/shared/styles/global.css'

// Splash control
SplashScreen.preventAutoHideAsync()

const expoDb = openDatabaseSync(DATABASE_NAME)

export default function RootLayout() {
  const db = drizzle(expoDb, { schema })
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  const { success, error: dbError } = useMigrations(db, migrations)

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  const FullScreenLoader = (
    <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark pt-20">
      <ActivityIndicator size="large" />
    </View>
  )

  if (!fontsLoaded && !fontError) return FullScreenLoader
  if (dbError) return <MainLayout><Text>Migration error: {dbError.message}</Text></MainLayout>
  if (!success) return <MainLayout><Text>Migration is in progress...</Text></MainLayout>

  return (
    <Suspense fallback={FullScreenLoader}>
      <ErrorBoundary>
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          useSuspense
          options={{ enableChangeListener: true }}
        >
          <ThemeProvider value={theme}>
            <View className="flex-1 bg-background dark:bg-background-dark">
              <Stack screenOptions={{ animation: 'fade' }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="class" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            </View>
          </ThemeProvider>
        </SQLiteProvider>
      </ErrorBoundary>
    </Suspense>
  )
}
