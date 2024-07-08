// lib
import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

// hooks
import { useAccordionsData } from "hooks/useAccordion";

// const
import colors from "constants/colors";

// components
import AccordionButton from "components/common/AccordionButton";
import Accordion from "components/common/Accordion";
import ReportItem from "components/common/ReportItem";

// utils
import { convertIsoToPersianDate } from "utils/dateTime";

export default function Home() {
  // animation
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(-1);
  const open = useSharedValue(true);
  const close = useSharedValue(false);

  const onPress = (activeIndex: number) => {
    if (activeIndex === activeAccordionIndex) {
      setActiveAccordionIndex(-1);
      return;
    }
    setActiveAccordionIndex(activeIndex);
  };

  const { isPending, isError, isSuccess, accordionsInfo } = useAccordionsData();

  if (isPending) return <Text>Loading...</Text>;
  if (isError) return <Text>Error fetching data</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.root}>
        {accordionsInfo.map((accordionData, index) => (
          <View key={accordionData.startDate + accordionData.title}>
            <View>
              <AccordionButton
                title={accordionData.title}
                sum={accordionData.sum}
                startDate={convertIsoToPersianDate(accordionData.startDate).dateString}
                endDate={convertIsoToPersianDate(accordionData.endDate).dateString}
                onPress={() => onPress(index)}
              />

              <Accordion
                isExpanded={activeAccordionIndex === index ? open : close}
                viewKey={`accordion_history_${index}`}
              >
                {accordionData.data.map((item: any) => (
                  <ReportItem
                    day={convertIsoToPersianDate(item.date).dateString}
                    date={convertIsoToPersianDate(item.date).dayOfWeek}
                    hours={item.duration.split(":")[0]}
                    isItDate={true}
                    key={Math.random()}
                    onPress={() => {}}
                  />
                ))}
              </Accordion>
            </View>
          </View>
        ))}
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
