import { Tabs } from "expo-router";
import { Dimensions, View, TouchableOpacity, Image,Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const { width } = Dimensions.get("window");

interface BarItem {
  focused: boolean;
  name: any;
  title:string;
}

const TabBar = ({ focused, name, title }: BarItem) => {
  if (focused) {
    return (
      <View style={{ backgroundColor: "red", borderRadius: 20, padding: 1, display: "flex",flexDirection:"row", alignItems: "center", minWidth: 80, gap:5, justifyContent:"center"}}>
        <Ionicons name={name} size={24} color="#fff" />
        <Text className="text-start text-white  font-bold">{title}</Text>
      </View>
    );
  } else {
    return (
      <View style={{ padding: 1 }}>
        <Ionicons name={name} size={24} color="#888" />
      </View>
    );
  }
};

const CustomHeader = () => {
  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 16,
      
    }} className="bg-slate-950">

        
      {/* Left — Profile Image */}
      <TouchableOpacity>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            borderWidth: 2,
            borderColor: "#fff",
          }}
        />
      </TouchableOpacity>
      {/* Right — Search & Notification */}
      <View style={{ flexDirection: "row", gap: 6 }}>
        <View className="bg-slate-800 p-2">
            <TouchableOpacity className="opacity-80">
                <Ionicons name="search-outline" size={26} color="#fff" />
            </TouchableOpacity>
        </View>
        <View className="bg-slate-800 p-2">
                    <TouchableOpacity style={{ position: "relative" }} className="opacity-80">
          <Ionicons name="notifications-outline" size={26} color="#f0f0f0" />
          <View style={{
            position: "absolute",
            top: -2,
            right: -2,
            backgroundColor: "red",
            width: 8,
            height: 8,
            borderRadius: 4,
          }} />
        </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,  // ✅ fixed
        header: () => <CustomHeader />,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          height: 70,
          width: width - 50,
          marginHorizontal: 20,
          borderRadius: 50,
          position: "absolute",
          bottom: 20,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          paddingHorizontal:2
        },
        tabBarItemStyle: {
          marginVertical: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBar name={focused ? "home" : "home-outline"} focused={focused} title="Home"/>
          ),
        }}
      />

      <Tabs.Screen
        name="trend"
        options={{
          title: "Trend",
          tabBarIcon: ({ focused }) => (
            <TabBar name={focused ? "trending-up" : "trending-up-outline"} focused={focused} title="Market"/>
          ),
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ focused }) => (
            <TabBar name={focused ? "wallet" : "wallet-outline"} focused={focused} title="Wallet"/>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabBar name={focused ? "compass" : "compass-outline"} focused={focused}  title="explore"/>
          ),
        }}
      />

      
    </Tabs>
  );
}