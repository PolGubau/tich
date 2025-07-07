import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function MainLayout({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <View className={`flex-1 py-6 pb-16 ${className}`}>
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