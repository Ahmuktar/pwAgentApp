import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { formatDate } from '@/lib/utils';
import { router } from 'expo-router';

const FacilityCard = ({ item }) => {
  const { id, fname, status, address, state, creation } = item;

  // Function to get status label and color
  const getStatusLabel = (status) => {
    if (status === 1) {
      return {
        label: 'Active',
        color: 'green',
      };
    } else {
      return {
        label: 'Inactive',
        color: 'red',
      };
    }
  };

  const statusDetails = getStatusLabel(status);

  const handlePress = () => {
    router.push(`/view-facility?id=${id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <View className="flex flex-row justify-between items-center mb-2">
        <Text numberOfLines={2} className="font-semibold text-lg text-gray-900">
          {fname}
        </Text>
        <View className={`px-3 py-1 rounded-full bg-${statusDetails.color}-200`}>
          <Text className={`text-${statusDetails.color}-600 text-sm`}>
            {statusDetails.label}
          </Text>
        </View>
      </View>

      <Text className="text-gray-700 text-sm mb-1">
        {address}
      </Text>
      <Text className="text-gray-600 text-sm mb-3">
        {state}
      </Text>

      <Text className="text-gray-500 text-xs">
        Created on: {formatDate(creation)}
      </Text>
    </TouchableOpacity>
  );
};

export default FacilityCard;
