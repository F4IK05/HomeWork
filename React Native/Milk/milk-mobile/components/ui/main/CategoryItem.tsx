import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Category } from "@/types/category";
import { CATEGORY_ICONS } from "@/types/category-icons";

interface CategoryItemProps {
  item: Category;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryItem = ({ item, isSelected, onPress }: CategoryItemProps ) => {
  const renderIcon = CATEGORY_ICONS[item.slug] || CATEGORY_ICONS.default;

  return (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
      <View style={[styles.iconContainer, isSelected && styles.activeIconContainer]}>
        {renderIcon(isSelected ? "#FFFFFF" : "#3480EB", 28)}
      </View>
      <Text style={[styles.categoryTitle, isSelected && styles.activeCategoryTitle]}>{item.name}</Text>
    </TouchableOpacity >

  )
};

const styles = StyleSheet.create({
  categoryCard: {
    alignItems: 'center',
    marginRight: 8,
    width: 80,
  },
  iconContainer: {
    width: 65,
    height: 65,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#3480EB',
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: 'Jakarta-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
  activeCategoryTitle: {
    color: '#1A1A1A',
    fontFamily: 'Jakarta-Bold',
  },
});