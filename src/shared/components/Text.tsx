import { Text as NativeText, StyleSheet, type TextProps } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';


export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
  customColor?: boolean;

  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | "small";
};

export function Text({
  style,
  lightColor,
  darkColor,
  className,
  customColor = false,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <NativeText
      className={className}
      style={[
        !customColor && { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'small' ? styles.small : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]
      }
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  small: {
    opacity: 0.8,
    fontSize: 13,
    lineHeight: 20,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});