import { Dimensions, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");
const boxWidth = (width - 44) / 2;

// ---- Each box is its own component with unique layout ----

const BalanceBox = () => (
  <View style={{ backgroundColor: "#1e293b", height: 176, width: boxWidth, borderRadius: 12, padding: 16, justifyContent: "space-between" }}>
    <Text style={{ color: "#888", fontSize: 12 }}>Total Balance</Text>
    <View>
      <Text style={{ color: "#fff", fontSize: 26, fontWeight: "700" }}>$12,430</Text>
      <Text style={{ color: "#22c55e", fontSize: 12 }}>▲ 4.2% this month</Text>
    </View>
  </View>
);

const SpendingBox = () => (
  <View style={{ backgroundColor: "#1e293b", height: 176, width: boxWidth, borderRadius: 12, padding: 16 }}>
    <Text style={{ color: "#888", fontSize: 12, marginBottom: 8 }}>Spending</Text>
    {["Food", "Transport", "Bills"].map((cat, i) => (
      <View key={cat} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
        <Text style={{ color: "#fff", fontSize: 12 }}>{cat}</Text>
        <Text style={{ color: "#f97316", fontSize: 12 }}>${[120, 45, 200][i]}</Text>
      </View>
    ))}
  </View>
);

const GoalBox = () => (
  <View style={{ backgroundColor: "#1e293b", height: 176, width: boxWidth, borderRadius: 12, padding: 16, justifyContent: "space-between" }}>
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Ionicons name="flag-outline" size={18} color="#6366f1" />
      <Text style={{ color: "#fff", fontSize: 13, fontWeight: "600" }}>Savings Goal</Text>
    </View>
    <View>
      {/* Progress bar */}
      <View style={{ backgroundColor: "#334155", borderRadius: 10, height: 8, marginBottom: 6 }}>
        <View style={{ backgroundColor: "#6366f1", borderRadius: 10, height: 8, width: "65%" }} />
      </View>
      <Text style={{ color: "#888", fontSize: 11 }}>65% of $5,000 reached</Text>
    </View>
  </View>
);

const QuickSendBox = () => (
  <View style={{ backgroundColor: "#1e293b", height: 176, width: boxWidth, borderRadius: 12, padding: 16 }}>
    <Text style={{ color: "#888", fontSize: 12, marginBottom: 12 }}>Quick Send</Text>
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {["JD", "AB", "RK", "TM"].map((initials) => (
        <View key={initials} style={{
          backgroundColor: "#334155",
          width: 44, height: 44,
          borderRadius: 22,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{ color: "#fff", fontSize: 13, fontWeight: "600" }}>{initials}</Text>
        </View>
      ))}
    </View>
  </View>
);

const AlertBox = () => (
  <View style={{ backgroundColor: "#7f1d1d", height: 176, width: boxWidth, borderRadius: 12, padding: 16, justifyContent: "space-between" }}>
    <Ionicons name="warning-outline" size={28} color="#ef4444" />
    <View>
      <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>Low Balance</Text>
      <Text style={{ color: "#fca5a5", fontSize: 11, marginTop: 4 }}>Your savings dropped below $500</Text>
    </View>
  </View>
);

const RecentBox = () => (
  <View style={{ backgroundColor: "#1e293b", height: 176, width: boxWidth, borderRadius: 12, padding: 16 }}>
    <Text style={{ color: "#888", fontSize: 12, marginBottom: 10 }}>Recent</Text>
    {[
      { name: "Netflix", amount: "-$12.99" },
      { name: "Salary", amount: "+$3,200" },
      { name: "Uber", amount: "-$8.50" },
    ].map((tx) => (
      <View key={tx.name} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={{ color: "#fff", fontSize: 12 }}>{tx.name}</Text>
        <Text style={{ color: tx.amount.startsWith("+") ? "#22c55e" : "#ef4444", fontSize: 12 }}>{tx.amount}</Text>
      </View>
    ))}
  </View>
);

// ---- Layout ----

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020617" }}>
      <View style={{ marginLeft: 20, marginTop: 16, marginBottom: 24 }}>
        <Text style={{ color: "#fff", fontSize: 30 }}>Transactions</Text>
        <Text style={{ color: "#fff", fontSize: 30 }}>History</Text>
      </View>

      <ScrollView contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        paddingHorizontal: 16,
        paddingBottom: 100,
      }}>
        <BalanceBox />
        <SpendingBox />
        <GoalBox />
        <QuickSendBox />
        <AlertBox />
        <RecentBox />
      </ScrollView>
    </SafeAreaView>
  );
}
