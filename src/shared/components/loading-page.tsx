import { Stack } from 'expo-router'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function LoadingPage() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Loading...",
        }}
      />
      <View className='flex-1 items-center mt-28'>
        <ActivityIndicator size="large" />
      </View>
    </View>
  )
}