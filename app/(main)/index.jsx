// app/_layout.js
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="send"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="histori"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="text"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="settings"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="plus"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ask"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="event"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}