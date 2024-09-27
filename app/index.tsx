import { Image, ScrollView, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants";
import { useUserStore } from "@/store";

const App = () => {
  const { user, token, setToken } = useUserStore();

  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex-col justify-start items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-80 h-[200px]"
            resizeMode="contain"
          />

          <Image
            source={images.card}
            className="w-[1000px] h-[280px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-gray-800 font-bold text-center">
              Empower Pharmacies with{" "}
              <Text className="text-primary">Your Expertise</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-500 text-center mt-7">
            Join us in transforming pharmacy management: onboard new clients
            effortlessly and help them streamline their operations.
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-10"
            textStyles="text-white"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default App;
