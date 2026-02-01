import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";
import { HomeHeader } from "@/components/screen/main/HomeHeader";
import { SearchBar } from "@/components/screen/main/SearchBar";
import { LocationSelector } from "@/components/screen/main/LocationSelector";
import { PromoSlider } from "@/components/screen/main/PromoSlider";
import { Categories } from "@/components/screen/main/Categories";
import { PopularPicks } from "@/components/screen/main/PopularPicks";
import { useState } from "react";

export default function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView stickyHeaderIndices={[2]} showsVerticalScrollIndicator={false}>
                <HomeHeader />
                <LocationSelector />
                <View style={styles.searchBar}>
                    <SearchBar />
                </View>
                <PromoSlider />
                <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory}/>
                <PopularPicks categorySlug={selectedCategory}/>
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    searchBar: {
        backgroundColor: "#f2f2f2", 
        paddingBottom: 10
    }
});