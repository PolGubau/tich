import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <View className='py-6'>
      {children}
    </View>
  )
}


export function SafeMainLayout({ children }: PropsWithChildren) {
  return (
    <SafeAreaView>
      <MainLayout>{children}</MainLayout>
    </SafeAreaView>
  )
}