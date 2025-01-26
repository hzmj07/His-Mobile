import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import colors from "../../color";
import { UserContext } from "../../context/context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { generateText } from "../../api/ai";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from "expo-router";

const HisEvent = ({ navigation }) => {
  const { token } = useContext(UserContext);
  const [inputText, setInputText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState("Arabic");
  const { t } = useTranslation();
  const [langt, setlangt] = useState(t("textGen.short"));
  const [expression, setexpression] = useState("basic");
  const [style, setstyle] = useState("real");
  const options = [t("textGen.short"), t("textGen.medium"), t("textGen.long")]
  const params = useLocalSearchParams();
  const { data } = params;
  console.log(data);
  const router = useRouter(); // useRouter hook'u, navigasyon işlemleri için kullanılır
  

  const generate = async () => {
    console.log("loading...");
    setIsLoading(true);
    console.log( "data", langt,
      inputText,
      expression,
      style,
      token.accessToken,
      "event");
    try {
      const response = await generateText(
        langt,
        inputText,
        expression,
        style,
        token.accessToken,
        data,
        lang
      );
     
      
      router.push({
        pathname: '/text',
        params: { data: response.data }, // Parametre gönder
      });
      setIsLoading(false);
      setInputText();
    } catch (error) {
      console.error(`dataa`, error);
      setIsLoading(false)
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgColor,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 65,
        }}
      >
        <View
          style={{
            top: 0,
            position: "absolute",
            flexDirection: "row",
            paddingLeft: 20,
            height: 65,
            alignItems: "center",
            width: "100%",
          }}
        >
          <MaterialIcons
            onPress={() => router.back()}
            name="arrow-back-ios-new"
            size={25}
            color="black"
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
            Historical Ai
          </Text>
         
        </View>
        <View style={styles.head}>
  {options.map((option, index) => (
    <TouchableOpacity
      key={index} // Benzersiz key
      onPress={() => setlangt(option)}
      style={[
        styles.headButons,
        langt === option ? { backgroundColor: colors.inputBGC } : null,
      ]}
    >
      <Text>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
    </TouchableOpacity>
  ))}
</View>
        <View style={styles.main}>
          <View style={styles.inputCont}>
            <TextInput
              multiline
              onChangeText={setInputText}
              value={inputText}
              placeholder={t("event.plasholder")}
              style={styles.inputMain}
            />
          </View>
        </View>
  <View style={{width:"100%" ,flexDirection:"row" , justifyContent:"center"}} >
        <View style={styles.pickerComp}>
          <Text style={styles.pickerText}>{t("textGen.expression")}</Text>
          <View style={styles.picker}>
            <Picker
              style={{ flex: 1 }}
              selectedValue={expression}
              onValueChange={(itemValue, itemIndex) => setexpression(itemValue)}
            >
              <Picker.Item label={t("textGen.expression_params.basic")} value="simple" />
              <Picker.Item label={t("textGen.expression_params.understandable")} value="understandable" />
              <Picker.Item label={t("textGen.expression_params.scientific")} value="scientific" />
            </Picker>
          </View>
        </View>
        <View style={styles.pickerComp}>
          <Text style={styles.pickerText}>{t("textGen.style")}</Text>
          <View style={styles.picker}>
            <Picker
              style={{ flex: 1 }}
              selectedValue={style}
              onValueChange={(itemValue, itemIndex) => setstyle(itemValue)}
            >
              <Picker.Item
                label={t("textGen.style_params.realistic")}
                value="realistic"
              />
              <Picker.Item label={t("textGen.style_params.epic")} value="epic" />
            </Picker>
          </View>
        </View>
</View>



        <View style={[styles.pickerComp , {width:"100%"}]}>
          <Text style={styles.pickerText}>{t("textGen.lang")}</Text>
          <View style={styles.picker}>
            <Picker
              style={{ flex: 1 }}
              selectedValue={lang}
              onValueChange={(itemValue, itemIndex) => setLang(itemValue)}
            >
              <Picker.Item label={t("langs.ar")} value="Arabic" />
              <Picker.Item label={t("langs.tr")} value="Turkish" />
              <Picker.Item label={t("langs.en")} value="English" />
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            generate();
          }}
          style={{
            width: 170,
            height: 50,
            backgroundColor: colors.inputBGC,
            marginTop: 30,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
          >
           {"  "}{t("textGen.create")}{" "}
          </Text>
          <Image
            style={{ height: 26, width: 26, marginRight: 12 }}
            source={require("../../assets/images/logo.png")}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 65,
          }}
        >
          <Text style={styles.Bottumtext}>{t("send.description")}</Text>
        </View>
      </View>
      {isLoading ? (
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            position: "absolute",
            flex: 1,
            width: "100%",
            height: "100%",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 80, width: 80, opacity: 1 }}
            source={require("../../assets/images/logo.png")}
          />
          <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 20 }}>
            Loading...
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default HisEvent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgColor,
    padding: 30,
  },

  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "black",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    height: 230,
  },
  inputCont: {
    height: "100%",
    width: "96%",
    flexDirection: "row",
    marginTop: 16,
    backgroundColor: colors.inputBGC,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: 20,
  },
  inputMain: {
    width: "100%",
    marginRight: 12,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginVertical: 10,
  },

  tinyLogo: {
    width: 55,
    height: 55,
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },

  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#e5e5ea",
    marginLeft: 30,
  },
  otherMessage: {
    alignSelf: "flex-start",
    marginRight: 30,
    marginLeft: 9,
  },
  messageText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "#ddd",
    height: 50,
    borderRadius: 16,
    marginBottom: 19,
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.inputBGC,
    paddingLeft: 10,
    paddingRight: 5,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    marginLeft: 12,
  },
  sendButton: {
    height: 40,
    width: 40,
    backgroundColor: "#000",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  head: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    padding: 3,
  },
  headButons: {
    width: "28%",
    height: "100% ",
    margin: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: "90%",
    height: 60,
    backgroundColor: colors.inputBGC,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 7,
    borderColor: colors.inputBorder,
  },
  pickerComp: { width: "48%", alignItems: "center", paddingTop: 10  },
  pickerText: {
    textAlign: "left",
    width: "80%",
    fontWeight: "bold",
    fontSize: 18,
  },
  Bottumtext: {
    fontSize: 16,
    textAlign: "center",
    width: "95%",
  },
});
