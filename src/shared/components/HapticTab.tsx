import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';


export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        impactAsync(ImpactFeedbackStyle.Light);
        props.onPressIn?.(ev);
      }}
    />
  );
}
