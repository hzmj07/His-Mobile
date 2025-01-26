import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useContext, useState , useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Formik } from "formik";
import * as Yup from "yup";
import colors from "../../color";
import { loginUser } from "../../api/auth";
import { UserContext } from "../../context/context";
import { showToast } from "../../components/globelError";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

//import * as Google from "expo-auth-session/providers/google";

import { useTranslation } from 'react-i18next';
//import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';

const Login = ({ navigation }) => {
  const { setUser, setToken, getUserData ,language } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setshowPass] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const { t } = useTranslation();
  const router = useRouter(); // useRouter hook'u, navigasyon işlemleri için kullanılır



  // const CLIENT_ID = '852463126953-vepaukb62ut1ukauklepcpqgs8ao8n0k.apps.googleusercontent.com'; // Buraya Google Developer Console'dan aldığınız client ID'yi girin.
  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId: CLIENT_ID,
  //   redirectUri: "https://auth.expo.io/@dev.hzm/com.dev.Historical_Mobile"

  // });


  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     console.log("Google Auth Success:", id_token);
  //   } else if (response?.type === "error") {
  //     console.error("Google Auth Error:", response.error);
  //   }
  // }, [response]);


  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '852463126953-oia8t7kv697p9pler7fdr5ug131vj51u.apps.googleusercontent.com',
  //     offlineAccess: true,
  //   });
  // }, []);

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log(userInfo);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log('Sign-In cancelled');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log('Sign-In in progress');
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // };


  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Lütfen geçerli bir e-posta adresi giriniz")
      .required("E-posta adresi gereklidir"),
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .required("Şifre gereklidir"),
  });

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      await loginUser(
        values.email,
        values.password,
        setUser,
        setToken,
        showToast,
        getUserData,
      );
    } catch (error) {
      showToast("Hata: Giriş yapılamadı");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.title}>Historical </Text>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/images/logo.png")}
          />
        </View>
        <View style={styles.main}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.inputCont}>
                  <MaterialIcons name="email" size={25} color="black" />
                  <TextInput
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    placeholder={t("authPage.email")}
                    style={styles.input}
                    placeholderTextColor={colors.charcoalGray}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <View style={styles.inputCont}>
                  <MaterialIcons name="password" size={25} color="black" />
                  <TextInput
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={showPass}
                    placeholder={t("authPage.pass")}
                    style={styles.input}
                    placeholderTextColor={colors.charcoalGray}
                  />
                  <Feather
                    onPress={() => {
                      setshowPass(!showPass);
                    }}
                    name={showPass ? "eye" : "eye-off"}
                    size={24}
                    color="black"
                  />
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <View style={styles.forgotPasswordContainer}>
                  <TouchableOpacity
                     onPress={() => router.push("/forget")}
                    style={{ width: 135 }}
                  >
                    <Text style={styles.forgotPasswordText}>
                    {t("authPage.forget")}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  disabled={isLoading}
                  onPress={handleSubmit}
                  style={styles.buton}
                >
                  {isLoading ? (
                    <ActivityIndicator color={"black"} />
                  ) : (
                    <>
                      <Text style={styles.butonText}>{t("authPage.login")}</Text>
                      <MaterialIcons
                        name="arrow-forward"
                        size={25}
                        color="black"
                      />
                    </>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>
        <TouchableOpacity
          onPress={() => promptAsync()}
          style={styles.googleAuthButton}
          >
            <AntDesign  name="google" size={34} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Registar")}>
          <Text style={styles.signupText}>
          {t("authPage.singin")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgColor,
    padding: 30,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#balck",
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
    justifyContent: "flex-start",
    marginTop: 25,
    backgroundColor: colors.inputBGC,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingLeft: 18,
    paddingRight:18
  },
  input: {
    marginLeft: 12,
    width: "80%",
    fontWeight: "bold",
    fontSize: 20,
    textAlign:"left"
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
  },
  forgotPasswordText: {
    textAlign: "right",
    fontSize: 17,
    color: "#000",
  },
  buton: {
    height: 48,
    marginTop: 23,
    marginBottom: 23,
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
  butonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 6,
  },
  signupText: {
    textAlign: "center",
    fontSize: 17,
    color: "#000",
    marginTop: 20,
    width: "100%",
  },
  errorText: {
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
  googleAuthButton:{
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  }
});
