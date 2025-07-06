import { Stack } from 'expo-router'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { t } from '../i18n/i18n'

export default function LoadingPage() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: t("loading"),
        }}
      />
      <View className='flex-1 items-center mt-28'>
        <ActivityIndicator size="large" />
      </View>
    </View>
  )
}