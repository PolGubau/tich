import React from 'react'
import { Switch, Text, View } from 'react-native'

export default function StudentEditDetailsScreen() {
  const [isEnabled, setIsEnabled] = React.useState(false)
  return (
    <View>
      <Text>StudentEditDetailsScreen</Text>
      <Switch
        // trackColor={{ false: '#767577', true: '#81b0ff' }}
        // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        // ios_backgroundColor="#3e3e3e"
        onValueChange={() => setIsEnabled(previousState => !previousState)}
        value={isEnabled}
      />
    </View>
  )
}