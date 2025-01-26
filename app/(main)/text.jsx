import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  Linking,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";
import colors from "../../color";
import { useLocalSearchParams } from 'expo-router';

const TextT = ({ route }) => {
  const [title, settitle] = useState("");
  console.log("titleeeeeeeeeeee", title);
  const params = useLocalSearchParams();
  const { data } = params;
  console.log("datattaaa", data);

  const navigation = useNavigation();

  const copyToClipboard = () => {
    Clipboard.setStringAsync(data);
  };

  const renderMessageText = (text) => {
    const sections = text.split(/(\*\*.*?\*\*|https?:\/\/[^\s]+)/g);

    return sections.map((section, index) => {
      section = section.replace(/\[|\]/g, "");

      if (section.startsWith("**") && section.endsWith("**")) {
        const extractedTitle = section.slice(2, -2);
        console.log("Detected title:", extractedTitle);

        if (
          extractedTitle !== "Giriş:" &&
          extractedTitle !== "Gelişme:" &&
          extractedTitle !== "Sonuç:" &&
          extractedTitle !== title // Infinite loop'u engellemek için kontrol
        ) {
          settitle(extractedTitle);
        }
      } else if (section.startsWith("http")) {
        const url = new URL(section);
        const domain = url.hostname.replace("www.", "");
        return (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(section)}
          >
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              {domain}
            </Text>
          </TouchableOpacity>
        );
      } else if (section.trim()) {
        return <Text key={index}>{section}</Text>;
      }

      return null;
    }).filter(Boolean);;
  };

  return (
    <View
      resizeMode="cover"
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.topRightButton}>
        <View
          style={{
            width: "50%",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="arrow-back-ios-new"
            size={25}
            color="black"
          />

          <Text
            style={{
              textAlign: "center",
              width: "80%",
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            Metin
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity onPress={copyToClipboard}>
            <MaterialIcons name="copy-all" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView
        style={{
          backgroundColor: colors.inputBGC,
          borderWidth: 1,
          borderColor: colors.inputBorder,
          borderRadius: 16,
          marginBottom: 15,
          height: "90%",
          paddingBottom: 2,
        }}
      >
        <View style={{ width: "100%", height: 60  , alignItems:"center" , justifyContent:"center" }}>
          <Text style={{textAlign:"center"  , fontSize:20 , fontWeight:"bold"  } } >{title}</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text selectable style={styles.text}>
            {renderMessageText(data.trim())}
          </Text>
          {/* Modal */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TextT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: colors.bgColor,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  topRightButton: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    flexDirection: "row",
    paddingLeft: 12,
    paddingRight: 12,
  },
  scrollViewContent: {
    flexGrow: 1,
    width: "100%",
    borderRadius: 16,
    paddingBottom: 20,
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  // Modal stilleri
});
