import { Link, Stack, usePathname } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function NotFoundScreen() {
  const pathname = usePathname()

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.text}>This screen does not exist.</Text>
        <Text style={styles.debug}>Current path: {pathname}</Text>
        <Link href="/home/dashboard" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  debug: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    color: 'blue',
  },
})
