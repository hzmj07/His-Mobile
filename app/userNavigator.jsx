import { Slot, Redirect } from "expo-router"; // Slot ve Redirect bileşenlerini import ediyoruz
import React, { useContext } from "react";
import Loading from "../components/loading"; // Loading bileşenini import ediyoruz
import { UserContext } from "../context/context"; // UserContext'i import ediyoruz



export default function RootLayout() {
    const { user, isLoading } = useContext(UserContext); // Kullanıcı durumunu alıyoruz
  
    if (isLoading) {
      return <Loading />; // Yükleniyor durumunda Loading bileşenini render et
    }
  
    if (user) {
      return <Redirect href="/(main)/send" />; // Kullanıcı giriş yapmışsa main grubuna yönlendir
    }
  
    return <Redirect href="/(auth)/login" />; // Kullanıcı giriş yapmamışsa auth grubuna yönlendir
  }