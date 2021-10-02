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
} from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default function PHome() {
  const [selected, setSelected] = useState("0");
  const [local_new_cases, setlocal_new_cases] = useState("");
  const [local_total_cases, setlocal_total_cases] = useState("");
  const [local_deaths, setlocal_deaths] = useState("");
  const [local_new_deaths, setlocal_new_deaths] = useState("");
  const [local_recovered, setlocal_recovered] = useState("");
  const [local_active_cases, setlocal_active_cases] = useState("");
  const [global_new_cases, setglobal_new_cases] = useState("");
  const [global_total_cases, setglobal_total_cases] = useState("");
  const [global_deaths, setglobal_deaths] = useState("");
  const [global_new_deaths, setglobal_new_deaths] = useState("");
  const [global_recovered, setglobal_recovered] = useState("");

  const API_ENDPOINT =
    "https://www.hpb.health.gov.lk/api/get-current-statistical";
  const getData = () => {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((result) => {
        setglobal_deaths(result.data.global_deaths);
        setglobal_new_cases(result.data.global_new_cases);
        setglobal_new_deaths(result.data.global_new_deaths);
        setglobal_recovered(result.data.global_recovered);
        setglobal_total_cases(result.data.global_total_cases);
        setlocal_active_cases(result.data.local_active_cases);
        setlocal_deaths(result.data.local_deaths);
        setlocal_new_cases(result.data.local_new_cases);
        setlocal_new_deaths(result.data.local_new_deaths);
        setlocal_recovered(result.data.local_recovered);
        setlocal_total_cases(result.data.local_total_cases);
      });
  };
  useEffect(() => {
    getData();
  });
  function renderglobalScrollView() {
    return (
      <ScrollView
        style={{ paddingHorizontal: 10, marginTop: 20 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        {/* ************ TOTAL CASES CARD ************* */}
        <View
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
        >
          <View style={{ width: 50, height: 50, alignSelf: "center" }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/sound.png")}
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
              TOTAL CASES
            </Text>
            <Text
              style={{
                color: COLORS.black,
                marginTop: 10,
                alignSelf: "center",
                fontSize: 22,
              }}
            >
              {global_total_cases}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  marginTop: 10,
                  alignSelf: "center",
                  fontSize: 15,
                }}
              >
                {global_new_cases}
              </Text>
            </View>
          </View>
        </View>
        {/* ********************* RECOVERED CARD ********************* */}
        <View
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
        >
          <View style={{ width: 50, height: 50, alignSelf: "center" }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/health.png")}
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
              RECOVERED
            </Text>
            <Text
              style={{
                color: COLORS.black,
                marginTop: 10,
                alignSelf: "center",
                fontSize: 22,
              }}
            >
              {global_recovered}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  marginTop: 10,
                  alignSelf: "center",
                  fontSize: 15,
                }}
              >
                133999
              </Text>
            </View>
          </View>
        </View>
        {/* *************** TOTAL DEATHS CARD ********************* */}
        <View
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
        >
          <View style={{ width: 50, height: 50, alignSelf: "center" }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/broken.png")}
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
              TOTAL DEATHS
            </Text>
            <Text
              style={{
                color: COLORS.black,
                marginTop: 10,
                alignSelf: "center",
                fontSize: 22,
              }}
            >
              {global_deaths}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  marginTop: 10,
                  alignSelf: "center",
                  fontSize: 15,
                }}
              >
                {global_new_deaths}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  function renderlocalScrollView() {
    return (
      <ScrollView
        style={{ paddingHorizontal: 10, marginTop: 20 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        {/* ************ TOTAL CASES CARD ************* */}
        <View
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
        >
          <View style={{ width: 50, height: 50, alignSelf: "center" }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/sound.png")}
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
              TOTAL CASES
            </Text>
            <Text
              style={{
                color: COLORS.black,
                marginTop: 10,
                alignSelf: "center",
                fontSize: 22,
              }}
            >
              {local_total_cases}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  marginTop: 10,
                  alignSelf: "center",
                  fontSize: 15,
                }}
              >
                {local_new_cases}
              </Text>
            </View>
          </View>
        </View>
        {/* ********************* RECOVERED CARD ********************* */}
        <View
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
        >
          <View style={{ width: 50, height: 50, alignSelf: "center" }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/health.png")}
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
              RECOVERED
            </Text>
            <Text
              style={{
                color: COLORS.black,
                marginTop: 10,
                alignSelf: "center",
                fontSize: 22,
              }}
            >
              {local_recovered}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  marginTop: 10,
                  alignSelf: "center",
                  fontSize: 15,
                }}
              >
                233999
              </Text>
            </View>
          </View>
        </View>
        {/* *************** TOTAL DEATHS CARD ********************* */}
        <View
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
        >
          <View style={{ width: 50, height: 50, alignSelf: "center" }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/broken.png")}
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
              TOTAL DEATHS
            </Text>
            <Text
              style={{
                color: COLORS.black,
                marginTop: 10,
                alignSelf: "center",
                fontSize: 22,
              }}
            >
              {local_deaths}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  marginTop: 10,
                  alignSelf: "center",
                  fontSize: 15,
                }}
              >
                {local_new_deaths}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
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
              Home
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
      <View style={styles.scrollcontainer}>
        <View
          style={{
            flexDirection: "row",
            height: 50,
            marginTop: SIZES.radius,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: SIZES.padding * 2,
          }}
        >
          {/* tab buttons */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ alignItems: "center", width: 80 }}
              onPress={() => setSelected("0")}
            >
              <Text
                style={{
                  color: selected === "0" ? COLORS.green : COLORS.gray,
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                Global
              </Text>
              <View
                style={{
                  marginTop: selected === "0" ? 3 : 4,
                  height: selected === "0" ? 4 : 2,
                  width: "100%",
                  backgroundColor:
                    selected === "0" ? COLORS.green : COLORS.white,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center", width: 100 }}
              onPress={() => setSelected("1")}
            >
              <Text
                style={{
                  color: selected === "1" ? COLORS.green : COLORS.gray,
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                Sri Lanka
              </Text>
              <View
                style={{
                  marginTop: selected === "1" ? 3 : 4,
                  height: selected === "1" ? 4 : 2,
                  width: "100%",
                  backgroundColor:
                    selected === "1" ? COLORS.green : COLORS.white,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.reloadContainer}>
              <Icons name="reload" size={24} color={COLORS.green} />
            </TouchableOpacity>
          </View>
        </View>
        {selected === "0" ? renderglobalScrollView() : renderlocalScrollView()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollcontainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  reloadContainer: {
    borderColor: "blue",
    elevation: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 40,
  },
});
