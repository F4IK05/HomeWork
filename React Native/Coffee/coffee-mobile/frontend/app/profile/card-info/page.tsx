import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { cardSchema, CardFormData } from "@/app/types/card-schema";
import { cardStorage } from "@/src/storage/cardStorage";

export default function CardInfoPage() {
  const [cardImage, setCardImage] = useState<string | null>(null);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    defaultValues: { cardNumber: "", expiryDate: "", cvv: "", cardHolder: "" }
  });

  useEffect(() => {
    (async () => {
      const savedData = await cardStorage.getCard();
      if (savedData) {
        setValue("cardNumber", savedData.cardNumber);
        setValue("expiryDate", savedData.expiryDate);
        setValue("cvv", savedData.cvv);
        setValue("cardHolder", savedData.cardHolder);
        setCardImage(savedData.cardImage || null);
      }
    })();
  }, [setValue]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      setCardImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (data: CardFormData) => {
    try {
      await cardStorage.saveCard({ ...data, cardImage });
      Alert.alert("Успех", "Данные карты сохранены");
      router.back();
    } catch (e) {
      Alert.alert("Ошибка", "Не удалось сохранить данные");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#0C0F14", "#0C0F14"]} style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="#52555A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Card Information</Text>
          <View style={{ width: 33 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {cardImage ? (
              <Image source={{ uri: cardImage }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Ionicons name="camera" size={40} color="#52555A" />
                <Text style={styles.addCardText}>Загрузить фото карты</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.form}>
            <InputGroup 
              label="Card Holder Name" 
              name="cardHolder" 
              control={control} 
              error={errors.cardHolder?.message}
              placeholder="Your Name"
            />

            <InputGroup 
              label="Card Number" 
              name="cardNumber" 
              control={control} 
              error={errors.cardNumber?.message}
              keyboardType="numeric"
              placeholder="0000 0000 0000 0000"
            />

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <InputGroup 
                  label="Expiry Date" 
                  name="expiryDate" 
                  control={control} 
                  error={errors.expiryDate?.message}
                  placeholder="MM/YY"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <InputGroup 
                  label="CVV" 
                  name="cvv" 
                  control={control} 
                  error={errors.cvv?.message}
                  keyboardType="numeric"
                  secureTextEntry
                  placeholder="***"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.saveButtonText}>Save Card</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const InputGroup = ({ label, name, control, error, ...props }: any) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={styles.label}>{label}</Text>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextInput 
          {...props}
          style={[styles.input, error && { borderColor: '#FB7185', borderWidth: 1 }]} 
          onChangeText={onChange} 
          value={value} 
          placeholderTextColor="#52555A"
        />
      )}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0C0F14" },
  background: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20 },
  backButton: { width: 33, height: 33, borderRadius: 10, backgroundColor: "#21262E", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#252A32" },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "600" },
  content: { padding: 20 },
  imageUpload: { height: 180, backgroundColor: "#21262E", borderRadius: 23, marginBottom: 25, overflow: "hidden", borderStyle: "dashed", borderWidth: 1, borderColor: "#D17842" },
  placeholderImage: { flex: 1, justifyContent: "center", alignItems: "center" },
  previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
  addCardText: { color: "#52555A", marginTop: 10, fontSize: 12 },
  form: { width: '100%' },
  label: { color: "#AEAEAE", fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: "#141921", borderRadius: 8, height: 48, paddingHorizontal: 16, color: "#FFFFFF", fontSize: 14 },
  row: { flexDirection: "row" },
  saveButton: { backgroundColor: "#D17842", borderRadius: 20, height: 60, alignItems: "center", justifyContent: "center", marginTop: 30 },
  saveButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  errorText: { color: "#FB7185", fontSize: 12, marginTop: 5 },
});