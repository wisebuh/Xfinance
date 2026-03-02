import { Dimensions, ScrollView, Text, TouchableOpacity, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const { width } = Dimensions.get("screen");

const cards = [
  { id: 1, balance: "$12,430.50", number: "**** **** **** 4291", type: "VISA", color: ["#1a1a2e", "#16213e"], accent: "#c9a84c" },
  { id: 2, balance: "$3,210.00", number: "**** **** **** 8874", type: "MASTERCARD", color: ["#0f0f1a", "#1a0a2e"], accent: "#a855f7" },
  { id: 3, balance: "$840.20", number: "**** **** **** 1103", type: "VISA", color: ["#0a1628", "#0d2137"], accent: "#22c55e" },
];

const transactions = [
  { id: 1, name: "Apple Store", category: "Shopping", amount: "-$129.00", icon: "bag-outline", color: "#a855f7", date: "Today" },
  { id: 2, name: "Salary Credit", category: "Income", amount: "+$3,200.00", icon: "cash-outline", color: "#22c55e", date: "Today" },
  { id: 3, name: "Netflix", category: "Entertainment", amount: "-$15.99", icon: "tv-outline", color: "#ef4444", date: "Yesterday" },
  { id: 4, name: "Uber Ride", category: "Transport", amount: "-$12.50", icon: "car-outline", color: "#f97316", date: "Yesterday" },
  { id: 5, name: "Freelance Pay", category: "Income", amount: "+$800.00", icon: "laptop-outline", color: "#22c55e", date: "Jan 28" },
  { id: 6, name: "Electricity", category: "Bills", amount: "-$60.00", icon: "flash-outline", color: "#eab308", date: "Jan 27" },
  { id: 7, name: "Spotify", category: "Entertainment", amount: "-$9.99", icon: "musical-notes-outline", color: "#1db954", date: "Jan 26" },
];

const quickActions = [
  { label: "Send", icon: "arrow-up-outline" },
  { label: "Receive", icon: "arrow-down-outline" },
  { label: "Top Up", icon: "add-outline" },
  { label: "More", icon: "grid-outline" },
];

export default function WalletScreen() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#080810" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, paddingTop: 8, marginBottom: 28 }}>
          <View>
            <Text style={{ color: "#555", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>My Wallet</Text>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 2 }}>Good Morning, Alex</Text>
          </View>
          <TouchableOpacity style={{
            backgroundColor: "#111120",
            width: 44, height: 44,
            borderRadius: 22,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#1e1e35",
          }}>
            <Ionicons name="scan-outline" size={20} color="#c9a84c" />
          </TouchableOpacity>
        </View>

        {/* Stacked Cards */}
        <View style={{ height: 200, marginHorizontal: 24, marginBottom: 32 }}>
          {cards.map((card, index) => {
            const isActive = index === activeCard;
            const offset = (index - activeCard) * 14;
            const scale = 1 - Math.abs(index - activeCard) * 0.05;

            return (
              <TouchableOpacity
                key={card.id}
                onPress={() => setActiveCard(index)}
                activeOpacity={0.9}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: 180,
                  borderRadius: 20,
                  backgroundColor: card.color[0],
                  padding: 24,
                  justifyContent: "space-between",
                  top: offset > 0 ? offset : 0,
                  zIndex: isActive ? 10 : 10 - index,
                  transform: [{ scale }],
                  borderWidth: 1,
                  borderColor: isActive ? card.accent + "40" : "#1e1e35",
                  shadowColor: card.accent,
                  shadowOpacity: isActive ? 0.3 : 0,
                  shadowRadius: 20,
                  shadowOffset: { width: 0, height: 8 },
                }}
              >
                {/* Card glow */}
                <View style={{
                  position: "absolute",
                  top: -40, right: -40,
                  width: 160, height: 160,
                  borderRadius: 80,
                  backgroundColor: card.accent,
                  opacity: 0.06,
                }} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ color: card.accent, fontSize: 11, letterSpacing: 2, fontWeight: "700" }}>{card.type}</Text>
                  <View style={{ flexDirection: "row", gap: -8 }}>
                    <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: card.accent, opacity: 0.8 }} />
                    <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: card.accent, opacity: 0.5, marginLeft: -10 }} />
                  </View>
                </View>

                <View>
                  <Text style={{ color: "#ffffff80", fontSize: 11, marginBottom: 4 }}>Available Balance</Text>
                  <Text style={{ color: "#fff", fontSize: 26, fontWeight: "800", letterSpacing: -0.5 }}>{card.balance}</Text>
                  <Text style={{ color: "#ffffff50", fontSize: 13, marginTop: 8, letterSpacing: 2 }}>{card.number}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Card Dots */}
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 6, marginBottom: 32 }}>
          {cards.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => setActiveCard(i)}>
              <View style={{
                width: i === activeCard ? 20 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: i === activeCard ? cards[activeCard].accent : "#333",
              }} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 24,
          marginBottom: 32,
        }}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.label} style={{ alignItems: "center", gap: 8 }}>
              <View style={{
                width: 56, height: 56,
                borderRadius: 16,
                backgroundColor: "#111120",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#1e1e35",
              }}>
                <Ionicons name={action.icon as any} size={22} color={cards[activeCard].accent} />
              </View>
              <Text style={{ color: "#666", fontSize: 12 }}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Total Spent This Month */}
        <View style={{
          marginHorizontal: 24,
          backgroundColor: "#111120",
          borderRadius: 20,
          padding: 20,
          marginBottom: 28,
          borderWidth: 1,
          borderColor: "#1e1e35",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <View>
            <Text style={{ color: "#555", fontSize: 12, marginBottom: 4 }}>Spent This Month</Text>
            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "800" }}>$2,847.48</Text>
            <Text style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>▲ 8.2% vs last month</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ color: "#555", fontSize: 12, marginBottom: 4 }}>Budget Left</Text>
            <Text style={{ color: "#22c55e", fontSize: 18, fontWeight: "700" }}>$1,152</Text>
            {/* Mini progress bar */}
            <View style={{ width: 80, height: 4, backgroundColor: "#1e1e35", borderRadius: 2, marginTop: 8 }}>
              <View style={{ width: "72%", height: 4, backgroundColor: "#ef4444", borderRadius: 2 }} />
            </View>
          </View>
        </View>

        {/* Transactions */}
        <View style={{ marginHorizontal: 24 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>Transactions</Text>
            <TouchableOpacity>
              <Text style={{ color: cards[activeCard].accent, fontSize: 13 }}>See All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((tx, index) => (
            <View key={tx.id}>
              {/* Date separator */}
              {(index === 0 || tx.date !== transactions[index - 1].date) && (
                <Text style={{ color: "#444", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, marginTop: index !== 0 ? 16 : 0 }}>
                  {tx.date}
                </Text>
              )}

              <View style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#111120",
                borderRadius: 14,
                padding: 14,
                marginBottom: 8,
                borderWidth: 1,
                borderColor: "#1a1a2e",
              }}>
                {/* Icon */}
                <View style={{
                  width: 44, height: 44,
                  borderRadius: 12,
                  backgroundColor: tx.color + "18",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 14,
                }}>
                  <Ionicons name={tx.icon as any} size={20} color={tx.color} />
                </View>

                {/* Info */}
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>{tx.name}</Text>
                  <Text style={{ color: "#444", fontSize: 12, marginTop: 2 }}>{tx.category}</Text>
                </View>

                {/* Amount */}
                <Text style={{
                  color: tx.amount.startsWith("+") ? "#22c55e" : "#fff",
                  fontSize: 15,
                  fontWeight: "700",
                }}>
                  {tx.amount}
                </Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}