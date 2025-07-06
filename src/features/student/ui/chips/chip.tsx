import React from 'react'
import { View } from 'react-native'

interface Props {
  children: React.ReactNode
  className?: string
}
export default function Chip({ children, className }: Props) {
  return (
    <View className={`gap-2 flex-row items-center border py-1.5 px-3 rounded-full border-neutral-500/30 ${className}`}>
      {children}
    </View>
  )
}