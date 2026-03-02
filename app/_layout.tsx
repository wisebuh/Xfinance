import { Stack } from "expo-router";
import { use, useState } from "react";
import { useRouter } from "expo-router";
import "./global.css"

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router  = useRouter();
  return <Stack 
  screenOptions={{
    headerShown:false,
  }}>
    <Stack.Screen
    name="(tabs)"
    />

    <Stack.Screen
    name="(auth)"
    />

    
  </Stack>;
}
