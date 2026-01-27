import { ImageBackground, Text, View, StyleSheet } from "react-native";
import CustomButton from "@/components/custom-button";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Index() {
  const handlePress = () => router.push("/(tabs)");

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.background} 
        source={require("@/assets/images/my-images/main-background.png")}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.overlay}>
          
          <View style={styles.topContent}>
            <Text style={styles.title}>
              Find and rent{"\n"}car in easy{"\n"}steps.
            </Text>
          </View>

          <View style={styles.bottomContent}>
            <CustomButton
              content="Let's Go!"
              onPress={handlePress}
              style={styles.button}
            />
          </View>

        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  topContent: {
    marginTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 56,
  },
  bottomContent: {
    marginBottom: 20, 
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#F9864A',
    borderRadius: 16,
    height: 65,
  }
});