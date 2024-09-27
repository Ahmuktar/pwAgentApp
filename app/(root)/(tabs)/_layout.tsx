import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

const TabIcon = ({ icon, color, name, focused }: any) => {
  return (
    <View className={`items-center justify-centerrounded-lg`}>
      <Ionicons name={icon} color={color} size={20} />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#3f54d1",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="home" color={color} name="Home" focused={focused} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="person"
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
