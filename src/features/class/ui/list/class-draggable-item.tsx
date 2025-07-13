import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Dimensions, StyleSheet, View } from 'react-native'
import {
  Gesture,
  GestureDetector
} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ClassPrimitive } from '~/domain/class/types'
import { Text } from '~/shared/components/Text'
import { useColorScheme } from '~/shared/hooks/useColorScheme'
import { t } from '~/shared/i18n/i18n'
import { useClass } from '../../model/use-class'
import ClassItem from './class-item'
import ClassItemSkeleton from './class-item-skeleton'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3

type Props = {
  onReload?: () => void
  classData: ClassPrimitive
  isPaid?: boolean
  classOptions?: {
    showStudent?: boolean
  }

}

export const ClassDraggableItem = ({ isPaid, classData, onReload, classOptions }: Props) => {
  const router = useRouter();
  const id = classData.id
  const isDark = useColorScheme() === 'dark'

  const { toggleIsPaid } = useClass(id)


  const onSwipeLeft = () => {
    router.navigate(`/class/${id}/edit`)
  }
  const onSwipeRight = () => {
    toggleIsPaid()
    onReload?.()
  }



  const translateX = useSharedValue(0)



  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const backgroundStyle = useAnimatedStyle(() => {
    // interpolación separada para fade hacia pastel según dirección
    const overlayColor = interpolateColor(
      translateX.value,
      [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      [
        isPaid ? '#ff000050' : '#00ff0050', // izquierda (rojo o verde)
        'transparent',                      // centro
        '#4a7bed50'                         // derecha (azul)
      ]
    )

    return {
      backgroundColor: overlayColor, // el pastel se aplica encima del fondo
    }
  })

  const leftIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
    )
    const max = Math.min(opacity, 1)
    return {
      opacity,
      transform: [{ scale: max }],
      left: 20,
    }
  })
  const rightIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, -SWIPE_THRESHOLD],
      [0, 1],
    )
    const max = Math.min(opacity, 1)

    return {
      opacity,
      transform: [{ scale: max }],
      right: 20,
    }
  })


  const pan = Gesture.Pan()
    .onChange(e => {
      translateX.value = e.translationX
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH, {}, () => {
          runOnJS(onSwipeLeft)()
          translateX.value = withTiming(0)
        })
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH / 2, {}, () => {
          runOnJS(onSwipeRight)()
          translateX.value = withTiming(0)
        })
      } else {
        translateX.value = withTiming(0)
      }
    })
    .activeOffsetX([-SWIPE_THRESHOLD, SWIPE_THRESHOLD])
    .failOffsetY([-10, 10]) // Prevents vertical movement from triggering the gesture
    .minDistance(10) // Prevents accidental swipes from small movements
    .maxPointers(1) // Limit to one finger
    .hitSlop({ top: 10, bottom: 10, left: 10, right: 10 }) // Increase touch area

  return (<>
    <GestureDetector gesture={pan}>

      <Animated.View style={[styles.container, backgroundStyle]}   >
        <Animated.View style={[styles.cornerContent, leftIconStyle]}>
          <Feather name="edit-2" size={17} color={isDark ? "#ffffff80" : "#00000080"} />
          <Text>{t("edit")}</Text>
        </Animated.View>
        <Animated.View style={[animatedStyle]}>
          {classData ? <ClassItem classData={classData} {...classOptions} /> : <ClassItemSkeleton {...classOptions} />}
        </Animated.View>
        <Animated.View style={[styles.cornerContent, rightIconStyle]}>
          <Feather name={isPaid ? 'x' : 'check'} size={17} color={isDark ? "#ffffff80" : "#00000080"} />

          <Text>{isPaid ? 'Set to unpaid' : 'Set to paid'}</Text>

        </Animated.View>
      </Animated.View>
    </GestureDetector>
    <View className='h-px bg-neutral-500/30 w-full' />
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // bottom border
    overflow: 'hidden',
  },

  cornerContent: {
    gap: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  }
})
