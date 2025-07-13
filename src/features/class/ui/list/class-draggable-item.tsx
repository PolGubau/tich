import { FontAwesome } from '@expo/vector-icons'
import { useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import {
  Gesture,
  GestureDetector
} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3

type Props = {
  children?: React.ReactNode
  onSwipeRight: () => void
  isPaid?: boolean
}

export const ClassDraggableItem = ({ children, isPaid, onSwipeRight }: Props) => {
  const translateX = useSharedValue(0)
  const paid = useSharedValue(isPaid)

  useEffect(() => {
    paid.value = isPaid
  }, [isPaid])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const iconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
    )
    return {
      opacity,
      transform: [{ scale: opacity }],
    }
  })


  const pan = Gesture.Pan()
    .onChange(e => {
      translateX.value = Math.max(0, e.translationX)
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH, {}, () => {
          onSwipeRight()
          translateX.value = withTiming(0)
        })
      } else {
        translateX.value = withTiming(0)
      }
    })
    .activeOffsetX([-10, 10]) // detecta solo si hay swipe horizontal real
  return (
    <GestureDetector gesture={pan}>

      <Animated.View style={styles.container}>
        <Animated.View style={[styles.icon, iconStyle]}>
          <FontAwesome name="check" size={24} color="white" />
        </Animated.View>
        <Animated.View style={[styles.card, animatedStyle]}>
          {children}
        </Animated.View>
      </Animated.View>
    </GestureDetector>

  )
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: 70,
    // marginBottom: 10,ç
    justifyContent: 'center',
    // backgroundColor: '#1da15f',
    // borderRadius: 12,
    overflow: 'hidden',
  },
  card: {
    // backgroundColor: 'white',
    // height: '100%',
    // justifyContent: 'center',
    // paddingLeft: 20,
    // borderRadius: 12,
  },

  icon: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
})
