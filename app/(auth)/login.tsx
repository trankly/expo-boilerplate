import { useState } from 'react';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, Input, Text, XStack, YStack } from 'tamagui';
import { supabase } from '~/utils/supabase';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      router.replace('/');
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <YStack f={1} jc="center" ai="center" p="$4" gap="$3">
          <Text fontSize={20} fontWeight="bold">
            Login
          </Text>

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            width={250}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            width={250}
          />

          {error ? (
            <Text color="$red10" fontSize={14}>
              {error}
            </Text>
          ) : null}

          <Button theme={'active'} onPress={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <XStack mt="$2" gap={'$2'}>
            <Button size="$2" onPress={() => router.push('/(auth)/signup')}>
              Sign up
            </Button>

            <Button size="$2" onPress={() => router.push('/(auth)/forgot')}>
              Forgot password?
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
