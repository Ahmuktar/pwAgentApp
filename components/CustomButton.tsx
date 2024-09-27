import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ 
  title, 
  handlePress, 
  containerStyles, 
  textStyles, 
  isLoading, 
  variant = 'primary', 
  size = 'medium' 
}) => {
  
  const baseStyles = 'rounded-xl justify-center items-center';
  
  const variantStyles = {
    primary: 'bg-primary text-white',
    secondary: 'bg-gray-600 text-white',
    outline: 'border border-blue-600 text-blue-600',
  };

  const sizeStyles = {
    small: 'min-h-[40px] h-10',
    medium: 'min-h-[50px] h-12',
    large: 'min-h-[56px] h-14',
  };

  const disabledStyles = isLoading ? 'opacity-50' : '';

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${containerStyles}`}
      disabled={isLoading}
    >
      <Text className={`font-medium text-base ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
