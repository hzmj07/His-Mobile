import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import colors from "../../color";
import { UserContext } from "../../context/context";
import { useRouter } from "expo-router";

const TextT = ({navigation}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { LogOut, user } = useContext(UserContext);
    const { language, changeLanguage } = useContext(UserContext);
    const { t } = useTranslation();
    const router = useRouter(); // useRouter hook'u, navigasyon işlemleri için kullanılır

   const change = async (lang) => {
    changeLanguage(lang);
    setIsPickerOpen(!isPickerOpen)
    }
  return (
    <View style={styles.container}>
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
            onPress={() => router.back()}
            name="arrow-back-ios-new"
            size={25}
            color="black"
          />
          <Text style={styles.headerTitle}>{t("settingPage.settings")}</Text>
        </View>
      </View>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <MaterialIcons name="account-circle" size={65} color="black" />
            <Text style={styles.text}>{user && user.username ? user.username : "null"}</Text> 
            </View>

          {/* Email Section */}
          <TouchableOpacity style={styles.element}>
            <MaterialIcons name="email" size={25} color="black" />
            <Text style={styles.text}>{user && user.email ? user.email : "null"}</Text> 
            </TouchableOpacity>

          {/* Lang Section */}
          <TouchableOpacity
            onPress={() => setIsPickerOpen(!isPickerOpen)}
            style={styles.element}
          >
            <Ionicons name="language-sharp" size={24} color="black" />
            <Text style={styles.text}>{t("settingPage.lang")}</Text>
          </TouchableOpacity>

          {/* Picker Section */}
          {isPickerOpen && (
            <View style={styles.pickerContainer}>
              <TouchableOpacity onPress={()=> change("ar")} style={styles.selectedLang}>
                <Text style={styles.selectedLangText}>{t("langs.ar")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> change("tr")}  style={styles.selectedLang}>
                <Text style={styles.selectedLangText}>{t("langs.tr")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> change("en")} style={styles.selectedLang}>
                <Text style={styles.selectedLangText}>{t("langs.en")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* About Section */}
          <TouchableOpacity style={styles.element}>
            <MaterialIcons name="info" size={25} color="black" />
            <Text style={styles.text}>{t("settingPage.about")}</Text>
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity onPress={() => LogOut()} style={styles.element}>
            <MaterialIcons name="logout" size={25} color="red" />
            <Text style={styles.text}>{t("settingPage.logouth")}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TextT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    padding: 10,
  },
  topRightButton: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    flexDirection: "row",
    paddingLeft: 22,
    paddingRight: 22,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "left",
    marginLeft: 16,
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 3,
    marginBottom: 15,
  },
  profileContainer: {
    height: 90,
    width: "100%",
    marginBottom: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 60,
  },
  element: {
    height: 60,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
  },
  text: {
    fontSize: 20,
    color: "black",
    marginLeft: 30,
  },
  pickerContainer: {
    marginTop: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: 150,
    width: "100%",
  },
  selectedLang: {
    width: "70%",
    height: 40,
    justifyContent: "center",
    borderRadius: 9,
    paddingLeft: 20,
    backgroundColor: colors.inputBGC,
    marginBottom:12
  },
  selectedLangText: { fontWeight: "500", fontSize: 17 },
  headerTitle: {
    width: "80%",
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 12,
  },
});
