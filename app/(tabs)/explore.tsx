import {
  Dimensions, Modal, ScrollView, Text, TextInput,
  TouchableOpacity, View, StatusBar, FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// ... (keep all your existing data: categories, trending, featured, movers)

// Add this full list for "See All" modal
const allAssets = [
  { id: 1, symbol: "BTC", name: "Bitcoin", price: "$67,420", change: "+4.21%", up: true, color: "#f97316" },
  { id: 2, symbol: "ETH", name: "Ethereum", price: "$3,512", change: "+2.87%", up: true, color: "#6366f1" },
  { id: 3, symbol: "AAPL", name: "Apple Inc.", price: "$189.30", change: "-0.54%", up: false, color: "#a1a1aa" },
  { id: 4, symbol: "SOL", name: "Solana", price: "$142.80", change: "+7.13%", up: true, color: "#14f195" },
  { id: 5, symbol: "TSLA", name: "Tesla", price: "$248.50", change: "-1.23%", up: false, color: "#ef4444" },
  { id: 6, symbol: "XAU", name: "Gold", price: "$2,045", change: "+0.34%", up: true, color: "#c9a84c" },
  { id: 7, symbol: "NVDA", name: "NVIDIA", price: "$875.40", change: "+12.4%", up: true, color: "#22c55e" },
  { id: 8, symbol: "DOGE", name: "Dogecoin", price: "$0.142", change: "+18.7%", up: true, color: "#eab308" },
  { id: 9, symbol: "META", name: "Meta", price: "$512.30", change: "-5.2%", up: false, color: "#ef4444" },
  { id: 10, symbol: "ADA", name: "Cardano", price: "$0.58", change: "+3.1%", up: true, color: "#3b82f6" },
  { id: 11, symbol: "BNB", name: "Binance Coin", price: "$412.00", change: "+1.9%", up: true, color: "#f59e0b" },
  { id: 12, symbol: "AMZN", name: "Amazon", price: "$185.20", change: "-0.8%", up: false, color: "#a1a1aa" },
];

// ---- Modal Component ----
const SeeAllModal = ({
  visible,
  title,
  data,
  onClose,
}: {
  visible: boolean;
  title: string;
  data: typeof allAssets;
  onClose: () => void;
}) => {
  const [searchText, setSearchText] = useState("");

  const filtered = data.filter(
    (a) =>
      a.name.toLowerCase().includes(searchText.toLowerCase()) ||
      a.symbol.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={{ flex: 1, backgroundColor: "#07070f" }}>

        {/* Modal Header */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#1a1a2e",
        }}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>{title}</Text>
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: "#111120",
              width: 36, height: 36,
              borderRadius: 18,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#1e1e35",
            }}
          >
            <Ionicons name="close" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search inside modal */}
        <View style={{
          marginHorizontal: 24,
          marginVertical: 16,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#111120",
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderWidth: 1,
          borderColor: "#1e1e35",
          gap: 10,
        }}>
          <Ionicons name="search-outline" size={16} color="#444" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search..."
            placeholderTextColor="#333"
            style={{ flex: 1, color: "#fff", fontSize: 14 }}
          />
        </View>

        {/* List */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#111120",
              borderRadius: 16,
              padding: 14,
              borderWidth: 1,
              borderColor: "#1a1a2e",
            }}>
              <View style={{
                width: 46, height: 46,
                borderRadius: 14,
                backgroundColor: item.color + "18",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 14,
              }}>
                <Text style={{ color: item.color, fontSize: 12, fontWeight: "800" }}>
                  {item.symbol.slice(0, 3)}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>{item.symbol}</Text>
                <Text style={{ color: "#444", fontSize: 12, marginTop: 1 }}>{item.name}</Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>{item.price}</Text>
                <Text style={{
                  color: item.up ? "#22c55e" : "#ef4444",
                  fontSize: 12,
                  fontWeight: "600",
                  marginTop: 2,
                }}>
                  {item.change}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
};

// ---- Main Screen ----
export default function ExploreScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // ✅ Modal state — one for each "See All"
  const [trendingModal, setTrendingModal] = useState(false);
  const [collectionsModal, setCollectionsModal] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#07070f" }}>
      <StatusBar barStyle="light-content" />

      {/* Modals */}
      <SeeAllModal
        visible={trendingModal}
        title="All Trending Assets"
        data={allAssets}
        onClose={() => setTrendingModal(false)}
      />
      <SeeAllModal
        visible={collectionsModal}
        title="All Collections"
        data={allAssets}
        onClose={() => setCollectionsModal(false)}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

        {/* ... all your existing content ... */}

        {/* Collections — wire up See All */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, marginBottom: 14 }}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>Collections</Text>
          <TouchableOpacity onPress={() => setCollectionsModal(true)}>  {/* ✅ */}
            <Text style={{ color: "#c9a84c", fontSize: 13 }}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Trending — wire up See All */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, marginBottom: 14 }}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>Trending</Text>
          <TouchableOpacity onPress={() => setTrendingModal(true)}>  {/* ✅ */}
            <Text style={{ color: "#c9a84c", fontSize: 13 }}>See All</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}