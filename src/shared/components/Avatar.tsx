import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { Image, View } from 'react-native'

type Props = {
  avatarUrl: string | null
  className?: string
  iconSize?: number
}

export default function Avatar({ avatarUrl, className, iconSize = 48 }: Props) {

  if (!avatarUrl) {
    return (
      <View className={`w-24 h-24 rounded-full bg-neutral-200 items-center justify-center ${className}`}>
        <MaterialIcons name="person" size={iconSize} color="#9ca3af" />
      </View>
    )
  }

  return (
    <Image source={{ uri: avatarUrl }} className={`w-24 h-24 rounded-full bg-neutral-200 ${className}`} accessibilityLabel={`Student's avatar`}
      accessibilityRole="image" />
  )
}