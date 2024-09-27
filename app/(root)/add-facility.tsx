import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Picker } from "@react-native-picker/picker"; // For dropdown select
import { useUserStore } from "@/store";
import { API_BASE_URL, facilitySchema } from "@/lib/utils";
import axios from "axios";
import { z } from "zod";

// Define the validation schema using zod

const AddFacility = () => {
  const { token } = useUserStore();
  const [facilityData, setFacilityData] = useState({
    fname: "",
    address: "",
    country: "",
    state: "",
    lga: "",
    type: "",
    plan: "",
    price: 0,
    name: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // To track validation errors

  const typeOptions = ["Pharmacy", "Chemist", "Medicine Store"];
  const planOptions = {
    Pharmacy: [
      { plan: "Standard Plan", price: 60000 },
      { plan: "Premium Plan", price: 100000 },
    ],
    Chemist: [
      { plan: "Basic Plan", price: 24000 },
      { plan: "Standard Plan", price: 36000 },
    ],
    "Medicine Store": [
      { plan: "Basic Plan", price: 24000 },
      { plan: "Standard Plan", price: 36000 },
      { plan: "Premium Plan", price: 60000 },
    ],
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setFacilityData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Update price when plan changes
    if (field === "plan") {
      const selectedPlan = planOptions[facilityData.type]?.find(
        (plan) => plan.plan === value
      );
      setFacilityData((prevData) => ({
        ...prevData,
        price: selectedPlan?.price || 0,
      }));
    }
  };

  // Handle form submission with zod validation
  const handleSubmit = async () => {
    setLoading(true);
    setErrors({}); // Clear previous errors

    // Validate form data using zod
    const validationResult = facilitySchema.safeParse(facilityData);

    if (!validationResult.success) {
      const errorObj = validationResult.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(errorObj); // Set the errors to display in UI
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/new-facility`,
        facilityData,
        {
          headers: {
            Authorization: token.accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Facility Added:", response.data);
      router.back(); // Navigate back after successful submission
    } catch (error) {
      console.error("Error adding facility:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="px-4 ">
        <FormField
          title="Facility Name"
          value={facilityData.fname}
          handleChangeText={(value) => handleChange("fname", value)}
          containerStyles="mt-4"
          errorMessage={errors.fname} // Display error for this field
        />
        <FormField
          title="Address"
          value={facilityData.address}
          handleChangeText={(value) => handleChange("address", value)}
          containerStyles="mt-4"
          errorMessage={errors.address} // Display error for this field
        />
        <FormField
          title="Country"
          value={facilityData.country}
          handleChangeText={(value) => handleChange("country", value)}
          containerStyles="mt-4"
          errorMessage={errors.country} // Display error for this field
        />
        <FormField
          title="State"
          value={facilityData.state}
          handleChangeText={(value) => handleChange("state", value)}
          containerStyles="mt-4"
          errorMessage={errors.state} // Display error for this field
        />
        <FormField
          title="Local Government Area"
          value={facilityData.lga}
          handleChangeText={(value) => handleChange("lga", value)}
          containerStyles="mt-4"
          errorMessage={errors.lga} // Display error for this field
        />

        {/* Select Type */}
        <View className="mt-4">
          <Text className="text-base text-gray-800 font-medium">
            Facility Type
          </Text>
          <View className="h-[50px] rounded-lg border-gray-200 bg-[#e8e8e8]">
            <Picker
              selectedValue={facilityData.type}
              onValueChange={(value) => handleChange("type", value)}
            >
              {typeOptions.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
          {errors.type && (
            <Text className="text-red-500">{errors.type}</Text> // Display error for type
          )}
        </View>

        {/* Select Plan */}
        <View className="mt-4">
          <Text className="text-base text-gray-800 font-medium">Plan</Text>
          <View className="h-[50px] rounded-lg border-gray-200 bg-[#e8e8e8]">
            <Picker
              selectedValue={facilityData.plan}
              onValueChange={(value) => handleChange("plan", value)}
            >
              {(planOptions[facilityData.type] || []).map(({ plan }) => (
                <Picker.Item key={plan} label={plan} value={plan} />
              ))}
            </Picker>
          </View>
          {errors.plan && (
            <Text className="text-red-500">{errors.plan}</Text> // Display error for plan
          )}
        </View>

        {/* Price */}
        <FormField
          title="Price"
          value={facilityData.price?.toString() || ""}
          editable={false} // Make it read-only since price is tied to the plan
          containerStyles="mt-4"
          errorMessage={errors.price} // Display error for price
        />

        <FormField
          title="Contact Name"
          value={facilityData.name}
          handleChangeText={(value) => handleChange("name", value)}
          containerStyles="mt-4"
          errorMessage={errors.name} // Display error for contact name
        />
        <FormField
          title="Email"
          value={facilityData.email}
          handleChangeText={(value) => handleChange("email", value)}
          containerStyles="mt-4"
          errorMessage={errors.email} // Display error for email
        />
        <FormField
          title="Phone"
          value={facilityData.phone}
          handleChangeText={(value) => handleChange("phone", value)}
          containerStyles="mt-4"
          errorMessage={errors.phone} // Display error for phone
        />
        <View className="mt-4">
          <Text className="text-base text-gray-800 font-medium">Gender</Text>
          <View className="h-[50px] rounded-lg border-gray-200 bg-[#e8e8e8]">
            <Picker
              selectedValue={facilityData.gender}
              onValueChange={(value) => handleChange("gender", value)}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
          {errors.gender && (
            <Text className="text-red-500">{errors.gender}</Text> // Display error for type
          )}
        </View>

        <CustomButton
          title="Submit"
          textStyles="text-white"
          handlePress={handleSubmit}
          containerStyles="my-7"
          isLoading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddFacility;
