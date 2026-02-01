import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const WaveDivider = () => (
    <View style={styles.waveContainer}>
        <Svg height="60" width="100%" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <Path
                fill="#FFFFFF"
                d="M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,128C1120,107,1280,117,1360,122.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            />
        </Svg>
    </View>
);

const styles = StyleSheet.create({
    waveContainer: {
        position: 'absolute',
        bottom: -1,
        width: '100%',
    }
});