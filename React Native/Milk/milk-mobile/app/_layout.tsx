import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { jakarta_font } from '@/constant/jakarta';

// Удерживаем сплэш-скрин
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts(jakarta_font);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signin/page.tsx" />
      <Stack.Screen name="signup/page.tsx" />
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name="catalog/page.tsx"/>
      <Stack.Screen name="cart/page.tsx"/>
    </Stack>
  );
}