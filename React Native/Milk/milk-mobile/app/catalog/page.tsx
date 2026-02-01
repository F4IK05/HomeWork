import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CatalogHeader } from '@/components/screen/catalog/CatalogHeader';
import { SearchBar } from '@/components/screen/catalog/SearchBar';
import { FilterSection } from '@/components/screen/catalog/FilterSection';
import { Assortment } from '@/components/screen/catalog/Assortment';

export default function CatalogPage() {
    return (
        <SafeAreaView style={styles.container}>
            <CatalogHeader />
            <SearchBar />
            <FilterSection />
            <Assortment />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
});