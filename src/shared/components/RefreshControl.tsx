import React from 'react'
import { RefreshControl as NativeRefreshControl } from 'react-native'
import { useColorScheme } from '../hooks/useColorScheme'

type Props = {
  onRefresh?: () => void
  refreshing: boolean
}

export default function RefreshControl({ onRefresh, refreshing }: Props) {
  const theme = useColorScheme()
  return (
    <NativeRefreshControl
      enabled={!!onRefresh}
      refreshing={refreshing}
      progressBackgroundColor={theme === 'dark' ? '#333' : '#fff'}
      colors={theme === 'dark' ? ['#fff'] : ['#000']}
      onRefresh={onRefresh}
    />
  )
}