import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { data } from "@/constant/data/categories";
import { CategoryItem } from "@/components/ui/main/CategoryItem";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { categoryService } from "@/services/categoryService";

interface CategoriesProps {
    selectedCategory: string;
    onSelectCategory: (slug: string) => void;
}

export const Categories = ({ selectedCategory, onSelectCategory } : CategoriesProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        const allCategory: Category = { id: 'all', name: 'All', slug: '' };
        setCategories([allCategory, ...data]);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator size="small" color="#3480EB" style={{ marginVertical: 20 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            isSelected={item.slug === selectedCategory}
            onPress={() => onSelectCategory(item.slug)} />)}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Jakarta-Bold',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  listContent: {
  },
});