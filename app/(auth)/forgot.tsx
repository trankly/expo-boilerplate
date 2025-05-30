import { useState } from 'react';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Button, Input, Text, YStack, XStack } from 'tamagui';
import { supabase } from '~/utils/supabase';

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://your-app.com/reset', // Replace with your deep link or web reset URL
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      Alert.alert('Email Sent', 'Check your inbox for a password reset link.');
      router.replace('/login');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <YStack f={1} jc="center" ai="center" p="$4" space="$3">
          <Text fontSize={20} fontWeight="bold">
            Forgot Password
          </Text>

          <Input
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            width={250}
          />

          {error ? (
            <Text color="$red10" fontSize={14}>
              {error}
            </Text>
          ) : null}

          <Button onPress={handleReset} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <XStack mt="$2">
            <Button size="$2" variant="outlined" onPress={() => router.replace('/login')}>
              Back to Login
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
