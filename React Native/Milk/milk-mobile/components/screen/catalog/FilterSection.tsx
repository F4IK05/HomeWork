import { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native"

const categories = ['All', 'Whole', 'Semi-Skimmed', 'Skimmed'];

export const FilterSection = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    return (
        <View style={styles.filterWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        onPress={() => setSelectedCategory(cat)}
                        style={[
                            styles.chip,
                            selectedCategory === cat && styles.activeChip
                        ]}
                    >
                        <Text style={[
                            styles.chipText,
                            selectedCategory === cat && styles.activeChipText
                        ]}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    filterWrapper: {
        marginBottom: 20,
        paddingLeft: 20
    },
    chip: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        marginRight: 10
    },
    activeChip: { 
        backgroundColor: '#3480EB', 
        borderColor: '#3480EB' 
    },
    chipText: { 
        fontFamily: 'Jakarta-SemiBold', 
        color: '#64748B' 
    },
    activeChipText: { 
        color: '#FFF'
    },
});