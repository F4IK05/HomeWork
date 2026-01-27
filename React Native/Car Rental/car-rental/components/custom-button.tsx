import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp
} from 'react-native';

interface CustomButtonProps {
  content: string;
  icon?: ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  content,
  icon,
  onPress,
  style
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.buttonContainer, style]}
    >

      <View style={styles.contentContainer}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <Text style={styles.text}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    width: '100%',
    marginVertical: 10,
  },
  borderRadius: {
    borderRadius: 12,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 12,
  },
  iconWrapper: {
    marginRight: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default CustomButton;