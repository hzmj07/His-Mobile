import React, { createContext, useState, useEffect, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { refrashToken } from "../api/auth";
import i18n from "../lang";
// Kullanıcı bilgileri için Context oluşturuyoruz
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const intervalRef = useRef(null); // Interval ID'yi saklamak için
  const [language, setLanguage] = useState(i18n.language);

  function checkTokenTime(tokens, accessTokenExpiry) {
    console.log("Tokens:", tokens.refreshToken);

    const check = () => {
      const currentTime = new Date();
      const accessTimeDate = new Date(tokens.acsessTime);
      const expiryTime = new Date(
        accessTimeDate.getTime() + accessTokenExpiry * 1000
      );

      const remainingTime = expiryTime - currentTime; // Milisaniye cinsinden kalan süre
      if (remainingTime > 120000) {
        console.log("Token geçerlidir");
      } else {
        console.log("Token geçerli değildir");
        refrashToken(tokens.refreshToken, setToken);
      }
    };

    // İlk çalıştırma
    check();

    // 60 saniyede bir çalıştırma
    intervalRef.current = setInterval(check, 60000);
  }

  const changeLanguage = async (lng) => {
    await SecureStore.setItemAsync("language", lng);
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };
  const getUserData = async () => {
    const userData = await SecureStore.getItemAsync("user");
    const language = await SecureStore.getItemAsync("language");
    if (userData) {
      const Token = await SecureStore.getItemAsync("token");
      setUser(userData ? JSON.parse(userData) : null);
      setToken(Token ? JSON.parse(Token) : null);
      console.log(JSON.parse(Token).accessTime);
      checkTokenTime(JSON.parse(Token), 3600);
      i18n.changeLanguage(language || "en");
      setLanguage(language || "en");
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserData();

    // Cleanup: Bileşen kapatılırken interval'i temizle
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const LogOut = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");

    // Interval'i durdur
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // ID'yi sıfırla
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setLoading,
        LogOut,
        token,
        setToken,
        getUserData,
        language,
        changeLanguage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
