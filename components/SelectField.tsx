import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectField = ({ 
  label, 
  value, 
  onValueChange, 
  items, 
  placeholder, 
  containerStyles = '', 
  pickerStyles = '', 
  variant = 'default' 
}) => {

  const variantStyles = {
    default: 'border-gray-200 bg-[#e8e8e8]',
    outlined: 'border-gray-300 bg-transparent',
    filled: 'border-none bg-[#f0f0f0]',
  };

  return (
    <View className={`space-y-2 ${containerStyles}`}>
      {label && (
        <Text className="text-base text-gray-800 font-pmedium">{label}</Text>
      )}
      <View className={`w-full border h-[50px] px-4 rounded-lg flex-row items-center ${variantStyles[variant]}`}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={`flex-1 text-gray-800 font-regular text-base ${pickerStyles}`}
        >
          {placeholder && <Picker.Item label={placeholder} value="" enabled={false} />}
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default SelectField;
