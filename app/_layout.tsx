import { Slot, Redirect } from "expo-router"; // Slot ve Redirect bileşenlerini import ediyoruz
import React, { useContext } from "react";
import Loading from "../components/loading"; // Loading bileşenini import ediyoruz
import {  UserProvider} from "../context/context"; // UserContext'i import ediyoruz
import RootLayout from "./userNavigator";


const _layout = () => {
  return (
    <UserProvider>
        <Slot/>
        <RootLayout/>
    </UserProvider>
  )
}

export default _layout

