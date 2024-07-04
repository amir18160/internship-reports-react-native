import colors from "constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  SharedValue,
  withTiming,
} from "react-native-reanimated";

type AccordionItemProps = {
  isExpanded: SharedValue<boolean>;
  children: React.ReactNode;
  viewKey: string;
  style?: object;
  duration?: number;
};

const Accordion = ({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
}: AccordionItemProps) => {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    }),
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}
    >
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    position: "absolute",
    alignItems: "center",
    backgroundColor: colors.primary[950],
    borderRadius: 16,
    padding: 10,
    right: 0,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  animatedView: {
    width: "100%",
    overflow: "hidden",
  },
});
