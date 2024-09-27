import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FacilityCard from "@/components/FacilityCard";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useUserStore } from "@/store";
import { Redirect, router } from "expo-router";
import { API_BASE_URL } from "@/lib/utils";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";

const Profile = () => {
  const { user, token, logOut } = useUserStore();
  const [facilityData, setFacilityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/facilities`, {
        headers: { Authorization: `${token.accessToken}` },
      });
      setFacilityData(response.data.facilities);
    } catch (error) {
      console.error("Error fetching facility data:", error.response?.data);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchFacilities().finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logOut();
  };

  const handleAddFacilityPress = () => {
    router.push("/(root)/add-facility");
  };

  // Pull to refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFacilities().finally(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView className="h-full px-4 flex-col items-center justify-center">
      <View className="my-5 justify-between items-center">
        <View className="flex-col items-center">
          <View className="rounded-full bg-gray-200 p-2 mr-2 border border-gray-400">
            <AntDesign name="user" size={100} color="gray" />
          </View>

          <Text className="font-semibold text-xl mt-5 text-gray-800">
            {user?.name}
          </Text>
        </View>
      </View>

      <View className="my-5 w-full space-y-5 bg-white rounded-lg py-6 px-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-medium">Email:</Text>
          <Text className="text-base font-medium">{user?.email}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-medium">Phone:</Text>
          <Text className="text-base font-medium">{user?.phone || "-"}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-medium">Gender:</Text>
          <Text className="text-base font-medium">{user?.gender || "-"}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-medium">Role:</Text>
          <Text className="text-base font-medium">{user?.role}</Text>
        </View>
      </View>

      <CustomButton
        title="Logout"
        handlePress={handleLogout}
        containerStyles="w-full bg-red-500 mt-10"
        textStyles="text-white"
      />

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Profile;
