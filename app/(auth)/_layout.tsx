import { Redirect, Stack } from 'expo-router';

import React from 'react';
import { useAuthStore } from '~/store/auth';

export default function AuthLayout() {
  const session = useAuthStore((s) => s.session);
  const didRestore = useAuthStore((s) => s.didRestore);

  if (!didRestore) return null;

  if (session) {
    return <Redirect href="/(drawer)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="forgot" options={{ headerShown: false }} />
    </Stack>
  );
}
