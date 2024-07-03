import { Linking } from "react-native";

const openLinkInBrowser = async (url: string): Promise<void> => {
  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  } catch (error) {
    console.error("An error occurred while trying to open the URL:", error);
  }
};

export default openLinkInBrowser;
