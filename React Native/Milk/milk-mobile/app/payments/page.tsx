import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // FontAwesome5 поинтереснее
import CreditCard from 'react-native-credit-card';

export default function PaymentMethodScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState(''); // Добавили имя владельца
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  const cleanNumber = useMemo(() => cardNumber.replace(/\D/g, ''), [cardNumber]);
  const cleanExpiry = useMemo(() => expiry.replace(/\D/g, ''), [expiry]);

  const cardConfig = useMemo(() => {
    const num = cleanNumber;
    if (num.startsWith('4')) return { type: 'visa', color: '#1a1f71', label: 'VISA', icon: 'cc-visa' };
    if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return { type: 'mastercard', color: '#2d3436', label: 'MASTERCARD', icon: 'cc-mastercard' };
    if (num.startsWith('220')) return { type: 'russian-mir', color: '#007f30', label: 'MIR', icon: 'credit-card' };
    if (num.startsWith('34') || num.startsWith('37')) return { type: 'amex', color: '#2e77bb', label: 'AMEX', icon: 'cc-amex' };
    return { type: 'unknown', color: '#3d3d3d', label: 'CARD', icon: 'credit-card' };
  }, [cleanNumber]);

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const matched = cleaned.match(/.{1,4}/g);
    setCardNumber(matched ? matched.join(' ').slice(0, 19) : cleaned);
  };

  const handleExpiryChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let result = cleaned;
    if (cleaned.length > 2) result = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    setExpiry(result.slice(0, 5));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Payment Method</Text>
        </View>

        {/* Улучшенная визуализация */}
        <View style={styles.cardWrapper}>
          <CreditCard
            number={cleanNumber}
            expiry={cleanExpiry}
            cvc={cvc}
            focused={isCvvFocused ? 'cvc' : 'number'}
            bgColor={cardConfig.color}
            shiny={true}
            bar={false}
          />
          
          {/* Наложение современной иконки поверх стандартной для "четкости" */}
          {!isCvvFocused && (
            <View style={styles.modernIconOverlay}>
              <FontAwesome5 name={cardConfig.icon} size={38} color="white" />
            </View>
          )}
        </View>

        <View style={styles.inputSection}>
          {/* Поле Имени */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="IVAN IVANOV"
              autoCapitalize="characters"
              onChangeText={setName}
              value={name}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                placeholder="0000 0000 0000 0000"
                keyboardType="numeric"
                onChangeText={handleCardNumberChange}
                value={cardNumber}
                maxLength={19}
              />
              <FontAwesome5 name={cardConfig.icon} size={20} color={cardConfig.color} style={{ marginRight: 15 }} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 15 }]}>
              <Text style={styles.inputLabel}>Expiry</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                keyboardType="numeric"
                onChangeText={handleExpiryChange}
                value={expiry}
                maxLength={5}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>CVC</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
                onFocus={() => setIsCvvFocused(true)}
                onBlur={() => setIsCvvFocused(false)}
                onChangeText={(t) => setCvc(t.replace(/\D/g, ''))}
                value={cvc}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: cardConfig.color }]} 
          onPress={() => router.back()}
        >
          <Text style={styles.saveButtonText}>Save Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 60, marginBottom: 30 },
  title: { fontSize: 22, fontFamily: "Jakarta-SemiBold", marginLeft: 15 },
  cardWrapper: { 
    height: 200,
    alignItems: 'center', 
    marginBottom: 40,
    zIndex: 1 // Важно для оверлея
  },
  modernIconOverlay: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    // Мы перекрываем стандартный логотип библиотеки своей иконкой
    backgroundColor: 'transparent', 
  },
  inputSection: { width: '100%' },
  inputGroup: { marginBottom: 18 },
  inputLabel: { fontSize: 13, color: '#888', marginBottom: 6, fontFamily: "Jakarta-SemiBold" },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  input: {
    padding: 14,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    fontFamily: "Jakarta-Medium",
  },
  row: { flexDirection: 'row' },
  saveButton: { 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginTop: 20, 
    marginBottom: 40,
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 }
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontFamily: "Jakarta-SemiBold" },
});