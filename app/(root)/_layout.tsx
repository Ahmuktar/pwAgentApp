import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="view-facility" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit-facility"
        options={{ headerTitle: "Edit Facility" }}
      />
      <Stack.Screen
        name="add-facility"
        options={{ headerTitle: "Add Facility" }}
      />
    </Stack>
  );
}
