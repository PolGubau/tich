import React, { JSX, useRef } from "react";
import { Animated, FlatListProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCustomFlatList } from "./use-custom-list";

type CustomFlatListProps<T> = Omit<FlatListProps<T>, "ListHeaderComponent"> & {
  /**
   * An element that is above all
   *
   * Hides when scrolling
   */
  HeaderComponent: JSX.Element;
  /**
   * An element that is above the list but lower than {@link Props.HeaderComponent HeaderComponent} and has the property sticky
   *
   * When scrolling is fixed on top
   */
  StickyElementComponent: JSX.Element;
  /**
   * An element that is higher than the list but lower than {@link Props.HeaderComponent HeaderComponent} and {@link Props.StickyElementComponent StickyElementComponent}
   *
   * Hides when scrolling
   */
  TopListElementComponent: JSX.Element;
};


export function CustomFlatList<T>({
  style,
  ...props
}: CustomFlatListProps<T>): React.ReactNode {
  const listRef = useRef<Animated.FlatList<T> | null>(null);

  const [
    scrollY,
    styles,
    onLayoutHeaderElement,
    onLayoutTopListElement,
    onLayoutStickyElement
  ] = useCustomFlatList();

  return (
    <SafeAreaView edges={["bottom"]} style={style} className="flex-1 overflow-hidden bg-neutral-200 dark:bg-neutral-700">
      <Animated.View  // <-- Sticky Component
        style={styles.stickyElement}
        onLayout={onLayoutStickyElement}
      >
        {props.StickyElementComponent}
      </Animated.View>

      <Animated.View  // <-- Top of List Component
        style={styles.topElement}
        onLayout={onLayoutTopListElement}
      >
        {props.TopListElementComponent}
      </Animated.View>

      <Animated.FlatList<any>
        ref={listRef}
        {...props}
        ListHeaderComponent={ // <-- Header Component
          <Animated.View onLayout={onLayoutHeaderElement}>
            {props.HeaderComponent}
          </Animated.View>
        }
        ListHeaderComponentStyle={[
          props.ListHeaderComponentStyle,
          styles.header
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true
          }
        )}
      />
    </SafeAreaView>
  );
}

 