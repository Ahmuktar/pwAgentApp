import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import { API_BASE_URL } from '@/lib/utils';
import { useUserStore } from '@/store';
import axios from 'axios';

const ViewFacility = () => {
    // Get facility form params
    const { id } = useLocalSearchParams();
    const { user, token, logOut } = useUserStore();
    const [facilityData, setFacilityData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchFacilities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/facilities/${id}`, {
          headers: { 'Authorization': `${token.accessToken}` }
        });
        setFacilityData(response.data.facility);
        console.log(response.data.facility);
      } catch (error) {
        console.error('Error fetching facility data:', error.response?.data);
      }
    };

    useEffect(() => {
      setLoading(true);
      fetchFacilities().finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
      logOut();
      router.replace("/(auth)/sign-in");
    };

    // Pull to refresh handler
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      fetchFacilities().finally(() => setRefreshing(false));
    }, []);

    // Function to navigate to edit facility page
    const handleEdit = () => {
        router.push(`/edit-facility?id=${id}`);
    };


  return (
    <SafeAreaView className="px-4">
      <Text className="text-lg font-semibold mb-2 mt-10">Detail</Text>
      <View className="bg-white p-4 rounded-lg space-y-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Name:</Text>
          <Text className="mb-1">{facilityData?.fname}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Address:</Text>
          <Text className="mb-1 text-right">{facilityData?.address}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Country:</Text>
          <Text className="mb-1">{facilityData?.country}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">State:</Text>
          <Text className="mb-1">{facilityData?.state}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">LGA:</Text>
          <Text className="mb-1">{facilityData?.lga}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Type:</Text>
          <Text className="mb-1">{facilityData?.type}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Plan:</Text>
          <Text className="mb-1">{facilityData?.plan}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Price:</Text>
          <Text className="mb-1">{facilityData?.price}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Status:</Text>
          <Text className="px-3 py-1 rounded-full text-green-900 font-medium bg-green-200">
            {facilityData?.status === 1 ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      <Text className="text-lg font-semibold mb-2 mt-6">Contact Information</Text>
      <View className="bg-white p-4 rounded-lg space-y-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Name:</Text>
          <Text className="mb-1">{facilityData?.name}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Email:</Text>
          <Text className="mb-1">{facilityData?.email}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Phone:</Text>
          <Text className="mb-1">{facilityData?.phone}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Gender:</Text>
          <Text className="mb-1">{facilityData?.gender}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold">Role:</Text>
          <Text className="mb-1">{facilityData?.role}</Text>
        </View>
      </View>

      <CustomButton
        title="Edit Facility"
        textStyles="text-white"
        handlePress={handleEdit}
        containerStyles="mt-7"
        isLoading={loading}
        />

    </SafeAreaView>
  );
};

export default ViewFacility;
