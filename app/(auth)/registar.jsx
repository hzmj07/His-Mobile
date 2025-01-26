import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Formik } from "formik";
import * as Yup from "yup";
import colors from "../../color";
import { registar } from "../../api/auth";
import { showToast } from "../../components/globelError";
import { useTranslation } from 'react-i18next';

// Validation Schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Lütfen geçerli bir e-posta adresi giriniz")
    .required("E-posta adresi gereklidir"),
  userName: Yup.string()
    .min(3, "Kullanıcı adı en az 3 karakterli olmalıdır")
    .required("Kullanıcı adı gereklidir"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre gereklidir"),
});

const Registar = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    const { userName, email, password } = values;
    try {
      await registar(userName, email, password, showToast);
      resetForm();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    // Navigation or feedback logic here
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
          initialValues={{ email: "", userName: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) =>
            handleSubmit(values, { resetForm })
          }
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

              <View style={styles.inputCont}>
                <MaterialIcons name="account-circle" size={24} color="black" />
                <TextInput
                  onChangeText={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  value={values.userName}
                  placeholder={t("authPage.userName")}
                  style={styles.input}
                />
              </View>
              {touched.userName && errors.userName && (
                <Text style={styles.error}>{errors.userName}</Text>
              )}

              <View style={styles.inputCont}>
                <MaterialIcons name="password" size={25} color="black" />
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                  placeholder={t("authPage.pass")}
                  style={styles.input}
                />
              </View>
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TouchableOpacity onPress={handleSubmit} style={styles.buton}>
                {isLoading ? (
                  <ActivityIndicator color={"black"} />
                ) : (
                  <>
                    <Text style={styles.butonText}>{t("authPage.registar")}</Text>
                    <MaterialIcons
                      name="arrow-forward"
                      size={25}
                      color="black"
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Registar;

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
    height: 48,
    marginTop: 23,
    borderRadius: 16,
    backgroundColor: colors.inputBGC,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderTopColor: colors.inputBorder,
    paddingLeft:10,
    paddingRight:10
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
  butonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 6,
   
  },
});
