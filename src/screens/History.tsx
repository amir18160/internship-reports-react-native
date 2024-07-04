import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import colors from "constants/colors";

import AccordionButton from "components/common/AccordionButton";
import Accordion from "components/common/Accordion";
import ReportItem from "components/common/ReportItem";

export default function Home() {
  const open = useSharedValue(false);

  const onPress = () => {
    open.value = !open.value;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.root}>
        <View>
          <AccordionButton onPress={onPress} />
        </View>

        <View>
          <AccordionButton onPress={onPress} />
        </View>

        <View>
          <AccordionButton onPress={onPress} />
        </View>

        <Accordion isExpanded={open} viewKey="accordion">
          {Array(20)
            .fill(1)
            .map(() => (
              <ReportItem
                isItDate
                key={Math.random()}
                day="1401/03/05"
                hours="4"
                onPress={() => {}}
              />
            ))}
        </Accordion>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[900],
  },
  root: {
    maxWidth: 800,
    width: "95%",
    marginHorizontal: "auto",
  },
});
