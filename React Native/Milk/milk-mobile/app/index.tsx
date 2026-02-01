import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IntroSlider } from '@/components/screen/index/IntroSlider';

export default function Index() {

    return (
        <View style={styles.container}>
            <IntroSlider />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    }
});