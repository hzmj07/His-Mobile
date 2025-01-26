import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Formik } from "formik";
import * as Yup from "yup";
import colors from "../../color";
import { useTranslation } from 'react-i18next';

// Validation Schema with Yup
const validationSchema = Yup.object({
  email: Yup.string().
  email("Lütfen geçerli bir e-posta adresi giriniz")
  .required("E-posta adresi gereklidir"),
});

const Forget = ({ navigation }) => {
  const { t } = useTranslation();

  const handleSubmit = async (values) => {
    const { email } = values;
    console.log("Password reset email sent to:", email);
    // Add API call logic for password reset here
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
<View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.title}>Historical </Text>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/images/logo.png")}
          />
        </View>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.main}>
              <View style={styles.inputCont}>
                <MaterialIcons name="email" size={25} color="black" />
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  placeholder={t("authPage.email")}
                  style={styles.input}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TouchableOpacity onPress={handleSubmit} style={styles.buton}>
                <Text
                  style={{ textAlign: "left", fontSize: 20, fontWeight: "bold" }}
                >
                  {t("authPage.send")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Forget;

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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
  },
  inputCont: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: colors.inputBGC,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  input: {
    marginLeft: 12,
    width: "80%",
    fontWeight: "bold",
    fontSize: 20,
    textAlign:"left"
  },
  buton: {
    width: 90,
    height: 48,
    marginTop: 23,
    borderRadius: 16,
    backgroundColor: colors.inputBGC,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderTopColor: colors.inputBorder,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    textAlign: "left",
    width: "100%",
    paddingHorizontal: 10,
  },
  tinyLogo: {
    width: 55,
    height: 55,
  },
});
