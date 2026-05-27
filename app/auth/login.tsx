import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const signInWithOtp = useAuthStore((state) => state.signInWithOtp);
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSendOtp = async () => {
    setErrorMessage(null);
    
    // Validate Indian 10-digit mobile layout
    const cleaned = phoneNumber.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    if (cleaned.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    const fullPhone = `+91${cleaned}`;
    setLoading(true);
    
    const { error } = await signInWithOtp(fullPhone);
    setLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Failed to send OTP. Please try again.');
    } else {
      router.push({
        pathname: '/auth/verify',
        params: { phone: fullPhone },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <ThemedView style={styles.container}>
          
          <ThemedView style={styles.headerContainer}>
            <ThemedText type="title" style={styles.title}>Welcome to EntePocket</ThemedText>
            <ThemedText style={styles.subtitle}>
              Your shared digital household notebook.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.formContainer}>
            <ThemedText style={styles.inputLabel}>Mobile Number</ThemedText>
            
            <ThemedView style={styles.inputWrapper}>
              <ThemedText style={styles.countryCode}>+91</ThemedText>
              <TextInput
                style={styles.textInput}
                placeholder="98765 43210"
                placeholderTextColor="#A19E9D"
                keyboardType="phone-pad"
                maxLength={12}
                value={phoneNumber}
                onChangeText={(text) => {
                  setErrorMessage(null);
                  const filtered = text.replace(/[^0-9 ]/g, '');
                  setPhoneNumber(filtered);
                }}
                editable={!loading}
                autoFocus
              />
            </ThemedView>

            {errorMessage && (
              <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
            )}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSendOtp}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FCF9F8" size="small" />
              ) : (
                <ThemedText style={styles.buttonText}>Send OTP</ThemedText>
              )}
            </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F3F2',
    borderRadius: 16,
    paddingHorizontal: 18,
    height: 64,
    marginBottom: 16,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1B1B',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#1C1B1B',
    padding: 0,
  },
  errorText: {
    fontSize: 14,
    color: '#B3261E',
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
});
