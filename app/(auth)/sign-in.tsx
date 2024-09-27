import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { useUserStore } from "@/store";
import { API_BASE_URL } from "@/lib/utils";
import axios from "axios";
import { router } from "expo-router";

const SignIn = () => {
  const { user, setUser, setToken } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userData = response.data;
      if (userData.error) {
        setErrorMessage(userData.error);
      } else {
        setUser(userData.user);
        setToken({
          accessToken: userData.token,
          expiresAt: userData.expiresAt,
        });
        router.push("/(root)/(tabs)");
      }
    } catch (error: any) {
      setErrorMessage(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <View className="w-full flex-col justify-center h-full px-4">
        <Image
          source={images.logo}
          className="w-64 h-[60px]"
          resizeMode="contain"
        />

        <Text className="text-2xl text-gray-800 text-semibold mt-10 font-semibold">
          Log in to your account
        </Text>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e: any) => setForm({ ...form, email: e })}
          containerStyles="mt-7"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e: any) => setForm({ ...form, password: e })}
          containerStyles="mt-7"
          keyboardType="text"
          isPassword
        />

        {errorMessage && (
          <Text className="text-red-500 mt-3">{errorMessage}</Text>
        )}

        <CustomButton
          title="Login"
          textStyles="text-white"
          handlePress={submit}
          containerStyles="mt-7 w-full"
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
