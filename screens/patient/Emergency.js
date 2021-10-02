import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Platform,
} from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Emergency() {
  const openDialResponse = () => {
    Platform.OS === "ios"
      ? Linking.openURL("telprompt:1999")
      : Linking.openURL("tel:1999");
  };
  const openDialAmbulance = () => {
    Platform.OS === "ios"
      ? Linking.openURL("telprompt:1990")
      : Linking.openURL("tel:1990");
  };
  const openDialPolice = () => {
    Platform.OS === "ios"
      ? Linking.openURL("telprompt:199")
      : Linking.openURL("tel:199");
  };
  const openDialInfo = () => {
    Platform.OS === "ios"
      ? Linking.openURL("telprompt:1919")
      : Linking.openURL("tel:1919");
  };
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          height: 80,
          width: "100%",
          backgroundColor: COLORS.green,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", padding: SIZES.padding }}>
            <Text style={{ color: COLORS.white, marginLeft: 20, fontSize: 23 }}>
              Emergency
            </Text>
          </View>
          <View>
            <Icons
              name="bell-outline"
              style={{ padding: SIZES.padding }}
              color="#ffffff"
              size={30}
            />
          </View>
        </View>
      </SafeAreaView>
      <ScrollView
        style={{ paddingHorizontal: 10, marginTop: 30 }}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {/* ************ Response Alert CARD ************* */}
          <TouchableOpacity
            style={{
              marginBottom: SIZES.radius,
              borderRadius: SIZES.radius * 2,
              paddingHorizontal: SIZES.padding / 2,
              marginHorizontal: 5,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white,
              borderWidth: SIZES.borderWidth,
              height: 200,
              width: 150,
              borderColor: COLORS.green,
              elevation: SIZES.elevation,
            }}
            onPress={() => openDialResponse()}
          >
            <View style={{ width: 70, height: 70, alignSelf: "center" }}>
              <Image
                style={{ width: 70, height: 70 }}
                source={require("../../assets/icons8-covid-19-64.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: COLORS.green,
                  fontSize: 17,
                  alignSelf: "center",
                }}
              >
                COVID
              </Text>
              <Text
                style={{
                  color: COLORS.green,
                  fontSize: 17,
                  alignSelf: "center",
                }}
              >
                Response Alert
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  marginTop: 10,
                  alignSelf: "center",
                  fontSize: 22,
                }}
              >
                1999
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: SIZES.radius,
              borderRadius: SIZES.radius * 2,
              paddingHorizontal: SIZES.padding / 2,
              marginHorizontal: 5,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white,
              borderWidth: SIZES.borderWidth,
              height: 200,
              width: 150,
              borderColor: COLORS.green,
              elevation: SIZES.elevation,
            }}
            onPress={() => openDialAmbulance()}
          >
            <View style={{ width: 70, height: 70, alignSelf: "center" }}>
              <Image
                style={{ width: 70, height: 70 }}
                source={require("../../assets/icons8-ambulance-100.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: COLORS.green,
                  fontSize: 17,
                  alignSelf: "center",
                }}
              >
                Suvasariya
              </Text>
              <Text
                style={{
                  color: COLORS.green,
                  fontSize: 17,
                  alignSelf: "center",
                }}
              >
                Ambulance
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  marginTop: 10,
                  alignSelf: "center",
                  fontSize: 22,
                }}
              >
                1990
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {/* ************ Police CARD ************* */}
          <TouchableOpacity
            style={{
              marginBottom: SIZES.radius,
              borderRadius: SIZES.radius * 2,
              paddingHorizontal: SIZES.padding / 2,
              marginHorizontal: 5,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white,
              borderWidth: SIZES.borderWidth,
              height: 200,
              width: 150,
              borderColor: COLORS.green,
              elevation: SIZES.elevation,
            }}
            onPress={() => openDialPolice()}
          >
            <View style={{ width: 70, height: 70, alignSelf: "center" }}>
              <Image
                style={{ width: 70, height: 70 }}
                source={require("../../assets/icons8-police-car-128.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: COLORS.green,
                  fontSize: 17,
                  alignSelf: "center",
                }}
              >
                Sri Lanka
              </Text>
              <Text
                style={{
                  color: COLORS.green,
                  fontSize: 17,
                  alignSelf: "center",
                }}
              >
                Police
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  marginTop: 10,
                  alignSelf: "center",
                  fontSize: 22,
                }}
              >
                199
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: SIZES.radius,
              borderRadius: SIZES.radius * 2,
              paddingHorizontal: SIZES.padding / 2,
              marginHorizontal: 5,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white,
              borderWidth: SIZES.borderWidth,
              height: 200,
              width: 150,
              borderColor: COLORS.green,
              elevation: SIZES.elevation,
            }}
            onPress={() => openDialInfo()}
          >
            <View style={{ width: 70, height: 70, alignSelf: "center" }}>
              <Image
                style={{ width: 70, height: 70 }}
                source={require("../../assets/icons8-information-100.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: COLORS.green,
                  fontSize: 17,
                  alignSelf: "center",
                }}
              >
                Information
              </Text>
              <Text
                style={{
                  color: COLORS.green,
                  fontSize: 17,
                  alignSelf: "center",
                }}
              >
                Center
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  marginTop: 10,
                  alignSelf: "center",
                  fontSize: 22,
                }}
              >
                1919
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
