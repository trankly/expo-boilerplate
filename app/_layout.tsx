import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Redirect, SplashScreen, Stack } from 'expo-router';

import React, { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import { useFonts } from 'expo-font';

import config from '../tamagui.config';
import { useAuthStore } from '~/store/auth';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

import AsyncStorage from '@react-native-async-storage/async-storage';

AsyncStorage.clear();

export default function RootLayout() {
  const restore = useAuthStore((s) => s.restore);
  const session = useAuthStore((s) => s.session); // <- session = null if not logged in

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    restore();
  }, []);

  if (!loaded || session === undefined) return null;

  return (
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
        </Stack>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
