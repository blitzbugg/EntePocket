import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/store/authStore';

export default function VerifyScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const signInWithOtp = useAuthStore((state) => state.signInWithOtp);

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fallback to login if phone number parameter is lost
  useEffect(() => {
    if (!phone) {
      router.replace('/auth/login');
    }
  }, [phone]);

  const handleVerify = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const token = otp.trim().replace(/[^0-9]/g, '');
    if (token.length !== 6) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    const { error } = await verifyOtp(phone, token);
    setLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Invalid verification code. Please try again.');
    }
  };

  const handleResend = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setResending(true);

    const { error } = await signInWithOtp(phone);
    setResending(false);

    if (error) {
      setErrorMessage(error.message || 'Failed to resend OTP. Please try again.');
    } else {
      setSuccessMessage('A new verification code has been sent.');
    }
  };

  const formattedPhone = phone ? phone.replace('+91', '+91 ') : '';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <ThemedView style={styles.container}>
          
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            disabled={loading}
          >
            <ThemedText style={styles.backButtonText}>← Back</ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.headerContainer}>
            <ThemedText type="title" style={styles.title}>Verify Your Number</ThemedText>
            <ThemedText style={styles.subtitle}>
              Enter the 6-digit OTP code sent to {formattedPhone}.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.formContainer}>
            <ThemedText style={styles.inputLabel}>6-Digit Code</ThemedText>
            
            <ThemedView style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="123456"
                placeholderTextColor="#A19E9D"
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={(text) => {
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  const filtered = text.replace(/[^0-9]/g, '');
                  setOtp(filtered);
                }}
                editable={!loading}
                autoFocus
              />
            </ThemedView>

            {errorMessage && (
              <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
            )}

            {successMessage && (
              <ThemedText style={styles.successText}>{successMessage}</ThemedText>
            )}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleVerify}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FCF9F8" size="small" />
              ) : (
                <ThemedText style={styles.buttonText}>Verify Code</ThemedText>
              )}
            </TouchableOpacity>

            <ThemedView style={styles.resendContainer}>
              <ThemedText style={styles.resendText}>Didn't receive the code? </ThemedText>
              {resending ? (
                <ActivityIndicator color="#4CAF50" size="small" />
              ) : (
                <TouchableOpacity onPress={handleResend} disabled={loading}>
                  <ThemedText style={styles.resendLink}>Resend OTP</ThemedText>
                </TouchableOpacity>
              )}
            </ThemedView>

          </ThemedView>

        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: '#FCF9F8',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 28,
    justifyContent: 'center',
    backgroundColor: '#FCF9F8',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 28,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  headerContainer: {
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1C1B1B',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6867',
    lineHeight: 22,
  },
  formContainer: {
    backgroundColor: 'transparent',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1B1B',
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: '#F6F3F2',
    borderRadius: 16,
    paddingHorizontal: 18,
    height: 64,
    marginBottom: 16,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 24,
    letterSpacing: 10,
    textAlign: 'center',
    fontWeight: '700',
    color: '#1C1B1B',
    padding: 0,
  },
  errorText: {
    fontSize: 14,
    color: '#B3261E',
    marginBottom: 16,
    fontWeight: '500',
  },
  successText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 16,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(76, 175, 80, 0.6)',
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FCF9F8',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    backgroundColor: 'transparent',
  },
  resendText: {
    fontSize: 15,
    color: '#6B6867',
  },
  resendLink: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4CAF50',
  },
});
