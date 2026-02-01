import AppIntroSlider from "react-native-app-intro-slider"
import { Slider } from "./Slider"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { useRef, useState } from "react";
import { router } from "expo-router";
import { data } from '@/constant/data/slide-data';
import { Ionicons } from "@expo/vector-icons";

export const IntroSlider = () => {
    const sliderRef = useRef<AppIntroSlider>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const onDone = () => router.replace('/signin/page');

    const handleBack = () => {
        sliderRef.current?.goToSlide(activeIndex - 1, true);
    };
    return (
        <AppIntroSlider
            ref={sliderRef}
            data={data}
            renderItem={({ item, index }) => (
                <Slider
                    item={item}
                    index={index}
                    handleBack={handleBack}
                    onDone={onDone}
                />
            )}
            onSlideChange={(index) => setActiveIndex(index)}
            dotStyle={[styles.dot, activeIndex === 0 && { backgroundColor: 'transparent' }]}
            activeDotStyle={[styles.activeDot, activeIndex === 0 && { backgroundColor: 'transparent' }]}
            showPrevButton={true}
            showNextButton={true}
            showDoneButton={true}
            renderNextButton={() => (
                activeIndex === 0 ? (
                    <View style={styles.centerButtonContainer}>
                        <View style={styles.circleButton}><Ionicons name="arrow-forward" size={24} color="white" /></View>
                    </View>
                ) : (
                    <View style={styles.rectButton}><Text style={styles.buttonText}>Next Step</Text></View>
                )
            )}
            renderDoneButton={() => (
                <TouchableOpacity onPress={onDone} style={styles.rectButton}><Text style={styles.buttonText}>Get Started</Text></TouchableOpacity>
            )}
            bottomButton={true}
        />
    )
}

const styles = StyleSheet.create({
    centerButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    circleButton: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: '#3480EB',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 50
    },
    rectButton: {
        backgroundColor: '#3480EB',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Jakarta-SemiBold",
    },

    dot: {
        backgroundColor: '#E4E7EC',
        width: 8,
        height: 8,
        marginBottom: 30
    },
    activeDot: {
        backgroundColor: '#3480EB',
        width: 24,
        height: 8,
        marginBottom: 30
    },
});