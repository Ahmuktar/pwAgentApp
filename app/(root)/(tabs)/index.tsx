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

const Home = () => {
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
    <SafeAreaView className="h-full px-4">
      <View className="mt-5 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="rounded-full bg-gray-200 p-2 mr-2 border border-gray-400">
            <AntDesign name="user" size={20} color="black" />
          </View>

          <Text className="font-semibold text-lg text-gray-800">
            Hi, {user?.name}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <View className="h-20 my-5 w-full flex-row items-end justify-between bg-primary rounded-lg p-3">
        <View>
          <Text className="text-sm text-white font-normal">
            Total facilities
          </Text>
          <Text className="text-2xl text-white font-semibold">
            {facilityData?.length}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleAddFacilityPress}
          className="flex-row items-center rounded-full px-3 py-2 bg-white border border-primary"
        >
          <AntDesign name="plus" size={12} color="#3f54d1" />
          <Text className="text-xs ml-1 text-primary font-medium">
            Add facility
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={facilityData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <FacilityCard item={item} />}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing} // Add refreshing state
        onRefresh={onRefresh} // Add onRefresh callback
        ListEmptyComponent={() =>
          loading ? (
            <View className="flex flex-col items-center justify-center">
              <ActivityIndicator size="large" color="green" />
              <Text className="mt-2">Loading facilities...</Text>
            </View>
          ) : (
            <View className="flex flex-col items-center justify-center">
              <Image
                source={images.noResult}
                className="w-40 h-40"
                alt="No recent rides found"
                resizeMode="contain"
              />
              <Text className="text-sm">No facility found</Text>
            </View>
          )
        }
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;
