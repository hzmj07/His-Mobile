// app/(auth)/_layout.js
import { Stack } from "expo-router"; // Expo Router'ın Stack navigasyonunu import ediyoruz
import React from "react";

export default function AuthLayout() {
  return (
    <Stack>
      {/* Her bir ekran için Stack.Screen tanımlıyoruz */}
      <Stack.Screen
        name="login" // app/(auth)/login.js dosyasına karşılık gelir
        options={{ headerShown: false }} // Başlık çubuğunu gizle
      />
      <Stack.Screen
        name="registar" // app/(auth)/registar.js dosyasına karşılık gelir
        options={{ headerShown: false }} // Başlık çubuğunu gizle
      />
      <Stack.Screen
        name="forget" // app/(auth)/forget.js dosyasına karşılık gelir
        options={{ headerShown: false }} // Başlık çubuğunu gizle
      />
    </Stack>
  );
}