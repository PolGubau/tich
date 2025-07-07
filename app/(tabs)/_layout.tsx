import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { HapticTab } from '~/shared/components/HapticTab';
import { IconSymbol } from '~/shared/components/ui/IconSymbol';
import { t } from '~/shared/i18n/i18n';
 



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
            title: t("dashboard"),
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="students"
          options={{
            title: t("students"),
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person" color={color} />,
          }}
        />
        <Tabs.Screen
          name="create-class"
          options={{
            title: t("create_class"),
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus" color={color} />,
          }}
        />
      </Tabs>
   );
}
