import { useState } from 'react';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, Input, Text, XStack, YStack } from 'tamagui';
import { supabase } from '~/utils/supabase';

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.replace('/login');
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
            Sign Up
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

          <Button theme={'active'} onPress={handleSignUp} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>

          <XStack mt="$2" gap="$4">
            <Button size="$2" variant="outlined" onPress={() => router.replace('/login')}>
              Back to Login
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
