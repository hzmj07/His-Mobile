import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { ipAdrees } from "../env";

const handleApiError = (e) => {
  const errorCode = e.response?.status || null;

  console.log("Error Code:", errorCode);

  const errorMessages = {
    402: "Kullanıcı Bulunamadı.",
    401: "Email veya şifre yanlış lütfen tekrar deneyiniz.",
    403: "Erişim reddedildi. Bu işlem için yetkiniz yok.",
    404: "Kaynak bulunamadı. Lütfen URL'yi kontrol edin.",
    500: "Sunucu hatası. Lütfen daha sonra tekrar deneyin.",
  };

  const errorMessage =
    errorMessages[errorCode] || "Please check your internet connection.";
  return errorMessage;
};


const saveToken = async (data , setToken) => {
  try {
    setToken(data.TokenS);
    await SecureStore.setItemAsync("token", JSON.stringify(data.TokenS));
  } catch (error) {
    console.error(error);
  }
};




export const loginUser = async (
  email,
  password,
  setUser,
  setToken,
  showToast,
  getUserData
) => {
  const saveUser = async (data) => {
    try {
      setUser(data.user);
      await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      console.log("kaydedildi");
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };



  try {
    const response = await axios.post(`http://${ipAdrees}:5055/auth/login`, {
      email: email,
      password: password,
    });
    saveToken(response.data , setToken);
    saveUser(response.data);
    console.log(response.data);
    showToast("success", response.data.user.username, "Hoşgeldiniz 👋");
  } catch (error) {
    showToast("error", "Hata!!", handleApiError(error));
  }
};

export const registar = async (useName, email, password, showToast) => {
  console.log("isloading");
  console.log(useName);
  try {
    const response = await axios.post(`http://${ipAdrees}:5055/auth/register`, {
      username: useName,
      email: email,
      password: password,
    });
    console.log(response);
    showToast("success", useName, "Hoşgeldiniz 👋");
  } catch (error) {
    showToast("error", "Hata!!", handleApiError(error));
  }
};


export const refrashToken = async (refrashToken , setToken) => {
  console.log(`refreshhtokenn` , refrashToken);
  
  try {
    const response = await axios.post(`http://${ipAdrees}:5055/auth/refresh-token`, {
       "refreshToken": refrashToken
    });
    console.log( "dataaaa" , response.data);
    saveToken({"TokenS" : response.data } , setToken)
    
  } catch (error) {
    console.error(error);
    
  }
};

