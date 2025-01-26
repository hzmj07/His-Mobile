import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../../color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from 'react-i18next';
import { UserContext } from "../../context/context";
import { useRouter } from "expo-router";

const Send = ({ navigation }) => {
  const [select, setSelect] = useState(null);
    const { t } = useTranslation();
    const { language, changeLanguage } = useContext(UserContext);
    console.log(language);
    const router = useRouter(); // useRouter hook'u, navigasyon işlemleri için kullanılır


    const handlePress = (ai) => {
      router.push({
        pathname: '/hisEvent',
        params: { data: ai }, // Parametre gönder
      });
    };

  return (
    <View
      resizeMode="cover"
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <Image
            style={styles.bgImage}
            source={require("../../assets/images/bg.png")}
          />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Üst sağ köşedeki yeni tuş */}
        <View style={styles.topRightButton}>
          <View style={{ marginRight: 12 }}>
          <TouchableOpacity  onPress={() => router.push("/histori")}>
                <MaterialIcons name="history" size={30} color="black" />
              </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              borderColor: "red",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/plus")}
              style={{
                
                borderWidth: 1,
                height: "100%",
                borderRadius: 8,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.inputBGC,
                borderColor: colors.inputBorder,
                paddingLeft:12,
                paddingRight:12
              }}
            >
              <MaterialCommunityIcons
                name="star-three-points"
                size={25}
                color="black"
              />
              <Text style={styles.butonText} > {t("send.plus")}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "flex-end",
              marginLeft: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => router.push("/settings")}>
              <MaterialIcons name="account-circle" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.title}>Historical </Text>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/images/logo.png")}
          />
        </View>

        {select == null && (
          <View style={styles.main}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => handlePress("person")}
                style={styles.buton}
              >
                <MaterialIcons name="person-2" size={24} color="black" />
                <Text style={styles.butonText}>{t("send.person")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress("event")}
                style={[styles.buton, { marginLeft: 16 }]}
              >
                <MaterialCommunityIcons
                  name="sword-cross"
                  size={24}
                  color="black"
                />
                <Text style={styles.butonText}>{t("send.event")}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Ask")}
              style={styles.buton}
            >
              <MaterialCommunityIcons
                name="chat-question-outline"
                size={24}
                color="black"
              />
              <Text style={styles.butonText}>{t("send.ask")}</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.Bottumtext}>{t("send.description")}</Text>
      </ScrollView>
    </View>
  );
};

export default Send;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgColor,
    padding: 30,
  },
  topRightButton: {
    position: "absolute",
    top: 10,
    padding: 5,
    width: "100%",
    flexDirection: "row",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    width: "90%",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "black",
  },
  main: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    height: 350,
  },

  buton: {
    height: 40,
    paddingLeft:10,
    paddingRight:10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    backgroundColor: colors.inputBGC,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  butonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 12,
  },
  text: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginVertical: 10,
  },
  // Modal stilleri

  Bottumtext: {
    fontSize: 16,
    textAlign: "center",
    width: "100%",
    position: "absolute",
    bottom: 20,
  },

  tinyLogo: {
    width: 55,
    height: 55,
  },
  bgImage:{
    position:"absolute",
    flex:1,
    opacity:0.03,
    
  }
});
