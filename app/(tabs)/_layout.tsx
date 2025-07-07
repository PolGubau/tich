import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { HapticTab } from '~/shared/components/HapticTab';
import { IconSymbol } from '~/shared/components/ui/IconSymbol';
 



export default function TabLayout() {

  const isLargeScreen = Platform.OS === 'web' && window.innerWidth >= 768;
  return (
 
      <Tabs
        screenOptions={{
          animation: "fade",
          headerShown: false,
          tabBarStyle: {
            ...Platform.select({
              ios: {
                position: 'absolute'
              },
              default: {},
            }),
          },


          tabBarButton: HapticTab,
          tabBarPosition: isLargeScreen ? 'left' : 'bottom',
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="students"
          options={{
            title: 'Students',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person" color={color} />,
          }}
        />
        <Tabs.Screen
          name="create-class"
          options={{
            title: 'Create Class',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus" color={color} />,
          }}
        />
      </Tabs>
   );
}
