import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { data } from "@/constant/data/slider-data";
import { PromoCard } from "@/components/ui/main/PromoCard";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

export const PromoSlider = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={ data }
                renderItem={({item}) => <PromoCard item={item}/>}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 15}
                decelerationRate="fast"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    }
});