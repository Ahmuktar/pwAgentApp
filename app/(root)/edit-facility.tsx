import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Picker } from "@react-native-picker/picker";
import { useUserStore } from "@/store";
import { API_BASE_URL } from "@/lib/utils";
import axios from "axios";
import { z } from "zod";

const facilitySchema = z.object({
  fname: z.string().min(1, "Facility Name is required"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  lga: z.string().min(1, "Local Government Area is required"),
  type: z.enum(["Pharmacy", "Chemist", "Medicine Store"]),
  plan: z.string().min(1, "Plan is required"),
  price: z.string().min(1, "Price is required"),
  name: z.string().min(1, "Contact Name is required"),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
});

const EditFacility = () => {
  const { id } = useLocalSearchParams();
  const { token } = useUserStore();
  const [facilityData, setFacilityData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  // Fetch facility data
  const fetchFacilities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/facilities/${id}`, {
        headers: { Authorization: `${token.accessToken}` },
      });
      setFacilityData(response.data.facility);
    } catch (error) {
      console.error("Error fetching facility data:", error.response?.data);
    }
  };

  const updateFacilities = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/facilities/${id}`,
        facilityData,
        {
          headers: { Authorization: `${token.accessToken}` },
        }
      );
      console.log("Facility updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating facility data:", error.response?.data);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchFacilities().finally(() => setLoading(false));
  }, []);

  // Handle input changes
  const handleChange = (field, value) => {
    setFacilityData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    // Reset errors when field changes
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
  };

  // Filter plan and price based on type selection
  const selectedPlans = planOptions[facilityData.type] || [];

  // Handle form submission
  const handleSubmit = async () => {
    const validationResult = facilitySchema.safeParse(facilityData);
    console.log(validationResult);
    if (validationResult.success === false) {
      const errorObj = validationResult.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(errorObj); // Set the errors to display in UI
      setLoading(false);
      return;
    }

    try {
      // Validate the data against the schema

      await updateFacilities();
      router.push(`/view-facility?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="px-4">
        <FormField
          title="Facility Name"
          value={facilityData.fname}
          handleChangeText={(value) => handleChange("fname", value)}
          containerStyles="mt-4"
          errorMessage={errors.fname}
        />

        <FormField
          title="Address"
          value={facilityData.address}
          handleChangeText={(value) => handleChange("address", value)}
          containerStyles="mt-4"
          errorMessage={errors.address}
        />
        <FormField
          title="Country"
          value={facilityData.country}
          handleChangeText={(value) => handleChange("country", value)}
          containerStyles="mt-4"
          errorMessage={errors.country}
        />

        <FormField
          title="State"
          value={facilityData.state}
          handleChangeText={(value) => handleChange("state", value)}
          containerStyles="mt-4"
          errorMessage={errors.state}
        />

        <FormField
          title="Local Government Area"
          value={facilityData.lga}
          handleChangeText={(value) => handleChange("lga", value)}
          containerStyles="mt-4"
          errorMessage={errors.lga}
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
            <Text className="text-red-500">{errors.type}</Text> // Display error for plan
          )}
        </View>

        {/* Select Plan */}
        <View className="mt-4">
          <Text className="text-base text-gray-800 font-medium">Plan</Text>
          <View className="h-[50px] rounded-lg border-gray-200 bg-[#e8e8e8]">
            <Picker
              selectedValue={facilityData.plan}
              onValueChange={(value) => {
                const selectedPlan = selectedPlans.find(
                  (plan) => plan.plan === value
                );
                handleChange("plan", value);
                handleChange("price", selectedPlan?.price || 0);
              }}
            >
              {selectedPlans.map(({ plan }) => (
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
          value={facilityData.price?.toString()}
          editable={false} // Make it read-only since price is tied to the plan
          containerStyles="mt-4"
        />

        <FormField
          title="Contact Name"
          value={facilityData.name}
          handleChangeText={(value) => handleChange("name", value)}
          containerStyles="mt-4"
          errorMessage={errors.name}
        />

        <FormField
          title="Email"
          value={facilityData.email}
          handleChangeText={(value) => handleChange("email", value)}
          containerStyles="mt-4"
          errorMessage={errors.email}
        />

        <FormField
          title="Phone"
          value={facilityData.phone}
          handleChangeText={(value) => handleChange("phone", value)}
          containerStyles="mt-4"
          errorMessage={errors.phone}
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

export default EditFacility;
