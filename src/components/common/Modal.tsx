import colors from "constants/colors";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Dialog, Portal, Text, Button } from "react-native-paper";

interface Props {
  title: string;
  contentText?: string;
  actionName?: string;
  visible: boolean;
  icon?: ReactNode;
  onClose: (flag: boolean) => void;
}

export default function Modal({
  title,
  contentText,
  actionName = "باشه",
  onClose,
  visible,
  icon,
}: Props) {
  const hideModal = () => onClose(false);
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideModal} style={styles.container}>
          <Dialog.Title style={styles.titleContainer}>
            <View>{icon}</View>
            <Text style={styles.title}>{title}</Text>
          </Dialog.Title>
          {contentText && (
            <Dialog.Content>
              <Text variant="bodyMedium" style={styles.textContent}>
                {contentText}
              </Text>
            </Dialog.Content>
          )}
          <Dialog.Actions>
            <Button
              onPress={hideModal}
              style={styles.buttonStyles}
              labelStyle={styles.buttonLabel}
              rippleColor={colors.accent[100]}
            >
              {actionName}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: colors.accent[200],
  },
  titleContainer: {
    textAlign: "right",
  },
  title: {
    fontFamily: "vazir500",
    textAlign: "center",
    color: colors.accent[950],
    flex: 1,
    fontSize: 24,
  },
  textContent: {
    textAlign: "right",
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: "vazir400",
    fontSize: 20,
    color: colors.accent[950],
    lineHeight: 35,
  },
  buttonStyles: {
    backgroundColor: colors.accent[500],
    paddingHorizontal: 20,
    // marginRight: 10,
    paddingTop: 3,
  },
  buttonLabel: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "vazir500",
  },
});
