import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function MainLayout({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <View className={`flex-1 py-6 ${className}`}>
      {children}
    </View>
  )
}



export function SafeMainLayout({ children }: PropsWithChildren) {
  return (
    <SafeAreaView className='flex-1'>
      <MainLayout>{children}</MainLayout>
    </SafeAreaView>
  )
}