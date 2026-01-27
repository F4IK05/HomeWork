import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Welcome",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="main/page"
        options={{
          title: "Main",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }
        } />
    </Stack>
  )


}
