import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MilkCoinsCard from "@/components/screen/profile/MilkCoinsCard";
import { ProfileMenu } from "@/components/screen/profile/ProfileMenu";
import { UserInfo } from "@/components/screen/profile/UserInfo";
import { ProfileHeader } from "@/components/screen/profile/ProfileHeader";

export default function ProfilePage() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <View style={styles.profileHeader}>
                    <ProfileHeader />
                </View>
                <UserInfo />
                <MilkCoinsCard />
                <ProfileMenu />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    profileHeader: {
        backgroundColor: "#f2f2f2", 
        paddingBottom: 10
    }
});