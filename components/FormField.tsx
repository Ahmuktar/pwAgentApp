import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const FormField = ({
  title,
  value,
  placeholder = "",
  handleChangeText,
  secureTextEntry = false,
  isPassword = false,
  containerStyles = "",
  inputStyles = "",
  variant = "default",
  errorMessage = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Default styles for different variants (e.g., outlined, filled)
  const variantStyles = {
    default: "border-gray-200 bg-[#e8e8e8]",
    outlined: "border-gray-300 bg-transparent",
    filled: "border-none bg-[#f0f0f0]",
  };

  return (
    <View className={`${containerStyles}`}>
      {title && (
        <Text className="text-base mb-2 text-gray-800 font-medium">
          {title}
        </Text>
      )}

      <View
        className={`w-full border h-[50px] px-4 rounded-lg flex-row items-center ${
          variantStyles[variant]
        } ${isFocused ? "border-primary" : ""}`}
      >
        <TextInput
          className={`flex-1 text-gray-800 font-regular text-base ${inputStyles}`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#a0a0a0"
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Show or hide password for password input */}
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text className="text-sm text-red-500 mt-1">{errorMessage}</Text>
      )}
    </View>
  );
};

export default FormField;
