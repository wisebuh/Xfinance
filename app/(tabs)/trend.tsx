import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const { width } = Dimensions.get("screen");

// ✅ Type declared FIRST before anything uses it
const chartData = {
  "1D": [
    { value: 420 }, { value: 480 }, { value: 450 }, { value: 520 },
    { value: 490 }, { value: 560 }, { value: 530 }, { value: 610 },
  ],
  "1W": [
    { value: 300 }, { value: 420 }, { value: 380 }, { value: 500 },
    { value: 460 }, { value: 540 }, { value: 610 },
  ],
  "1M": [
    { value: 200 }, { value: 350 }, { value: 300 }, { value: 450 },
    { value: 400 }, { value: 550 }, { value: 500 }, { value: 650 },
  ],
  "3M": [
    { value: 150 }, { value: 300 }, { value: 250 }, { value: 400 },
    { value: 350 }, { value: 500 }, { value: 480 }, { value: 630 },
  ],
  "1Y": [
    { value: 100 }, { value: 250 }, { value: 200 }, { value: 400 },
    { value: 350 }, { value: 550 }, { value: 500 }, { value: 700 },
  ],
};

// ✅ Type declared AFTER chartData, BEFORE timeframes
type Timeframe = keyof typeof chartData;

// ✅ Now timeframes can use the type safely
const timeframes: Timeframe[] = ["1D", "1W", "1M", "3M", "1Y"];

export default function TrendScreen() {
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>("1M");
  const isPositive = true;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0a0a0f" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, marginBottom: 24 }}>
          <Text style={{ color: "#555", fontSize: 13, marginBottom: 4 }}>Portfolio Value</Text>
          <Text style={{ color: "#fff", fontSize: 36, fontWeight: "700", letterSpacing: -1 }}>
            $24,831.50
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 }}>
            <Ionicons
              name={isPositive ? "arrow-up" : "arrow-down"}
              size={14}
              color={isPositive ? "#22c55e" : "#ef4444"}
            />
            <Text style={{ color: isPositive ? "#22c55e" : "#ef4444", fontSize: 14, fontWeight: "600" }}>
              +$1,240.30 (5.25%)
            </Text>
            <Text style={{ color: "#555", fontSize: 13 }}>today</Text>
          </View>
        </View>

        {/* Chart */}
        <View style={{
          backgroundColor: "#111118",
          marginHorizontal: 16,
          borderRadius: 20,
          paddingTop: 20,
          paddingBottom: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <LineChart
            data={chartData[activeTimeframe]}
            width={width - 48}
            height={180}
            color={isPositive ? "#22c55e" : "#ef4444"}
            thickness={2.5}
            hideDataPoints
            hideYAxisText
            hideAxesAndRules
            areaChart
            curved
            startFillColor={isPositive ? "#22c55e" : "#ef4444"}
            endFillColor="transparent"
            startOpacity={0.25}
            endOpacity={0}
            initialSpacing={0}
            endSpacing={0}
          />

          {/* Timeframe Selector */}
          <View style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: 16,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: "#1e1e2e",
            marginTop: 8,
          }}>
            {timeframes.map((tf) => (
              <TouchableOpacity
                key={tf}
                onPress={() => setActiveTimeframe(tf)}
                style={{
                  backgroundColor: activeTimeframe === tf ? "#22c55e" : "transparent",
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 20,
                }}
              >
                <Text style={{
                  color: activeTimeframe === tf ? "#000" : "#555",
                  fontSize: 13,
                  fontWeight: "600",
                }}>
                  {tf}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Row */}
        <View style={{ flexDirection: "row", gap: 12, marginHorizontal: 16, marginBottom: 12 }}>
          <View style={{ flex: 1, backgroundColor: "#111118", borderRadius: 16, padding: 16 }}>
            <Text style={{ color: "#555", fontSize: 12, marginBottom: 6 }}>Amount Traded</Text>
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700" }}>$8,450.00</Text>
            <Text style={{ color: "#22c55e", fontSize: 12, marginTop: 4 }}>▲ 12.4% vol</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#111118", borderRadius: 16, padding: 16 }}>
            <Text style={{ color: "#555", fontSize: 12, marginBottom: 6 }}>Active Since</Text>
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700" }}>142d</Text>
            <Text style={{ color: "#555", fontSize: 12, marginTop: 4 }}>Sep 12 — Now</Text>
          </View>
        </View>

        {/* P&L Row */}
        <View style={{ flexDirection: "row", gap: 12, marginHorizontal: 16, marginBottom: 12 }}>
          <View style={{ flex: 1, backgroundColor: "#0d1f17", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#14532d" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#22c55e" }} />
              <Text style={{ color: "#555", fontSize: 12 }}>Realized P&L</Text>
            </View>
            <Text style={{ color: "#22c55e", fontSize: 22, fontWeight: "700" }}>+$3,210</Text>
            <Text style={{ color: "#555", fontSize: 12, marginTop: 4 }}>Closed positions</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#1a0e0e", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#7f1d1d" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#ef4444" }} />
              <Text style={{ color: "#555", fontSize: 12 }}>Unrealized P&L</Text>
            </View>
            <Text style={{ color: "#ef4444", fontSize: 22, fontWeight: "700" }}>-$640</Text>
            <Text style={{ color: "#555", fontSize: 12, marginTop: 4 }}>Open positions</Text>
          </View>
        </View>

        {/* Trade Breakdown */}
        <View style={{ backgroundColor: "#111118", marginHorizontal: 16, borderRadius: 16, padding: 16 }}>
          <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600", marginBottom: 16 }}>
            Trade Breakdown
          </Text>
          {[
            { label: "Win Rate", value: "68%", color: "#22c55e" },
            { label: "Avg Win", value: "+$420", color: "#22c55e" },
            { label: "Avg Loss", value: "-$185", color: "#ef4444" },
            { label: "Total Trades", value: "84", color: "#6366f1" },
          ].map((item) => (
            <View key={item.label} style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#1e1e2e",
            }}>
              <Text style={{ color: "#555", fontSize: 13 }}>{item.label}</Text>
              <Text style={{ color: item.color, fontSize: 13, fontWeight: "600" }}>{item.value}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}