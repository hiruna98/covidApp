import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { database } from "../../src/config/firebase";

export default function Patient(props) {
  const [users, setUserss] = useState([]);

  function getData() {
    database
      .collection("users")
      .get()
      .then((query) => {
        let arr = [];
        query.forEach((element) => {
          arr.push(element.data());
        });
        setUserss(arr);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const renderList = (item) => {
    const data = item;
    return (
      <TouchableOpacity
        style={{
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius * 2,
          paddingHorizontal: SIZES.padding / 2,
          marginHorizontal: 5,
          paddingVertical: SIZES.radius,
          backgroundColor: COLORS.white,
          borderWidth: SIZES.borderWidth,
          height: 175,
          width: Dimensions.get("window").width - 30,
          borderColor: COLORS.green,
          elevation: SIZES.elevation,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            marginTop: 5,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: COLORS.green,
              fontSize: 23,
              marginLeft: 5,
            }}
          >
            {data.NIC}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            marginTop: 5,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: COLORS.green,
              fontSize: 17,
              marginLeft: 5,
            }}
          >
            {data.name}
          </Text>
          <Text
            style={{
              color: COLORS.green,
              fontSize: 17,
              marginLeft: 5,
            }}
          >
            Dose
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            marginTop: 5,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: COLORS.green,
              fontSize: 17,
              marginLeft: 5,
            }}
          >
            {data.province}
          </Text>
          <Text
            style={{
              color: COLORS.green,
              fontSize: 17,
              marginLeft: 5,
            }}
          >
            {data.district}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            marginTop: 5,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: COLORS.green,
              fontSize: 17,
              marginLeft: 5,
            }}
          >
            {data.age}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {data.quarantined === "true" ? (
            <TouchableOpacity
              style={styles.cardbtn}
              onPress={async () => {
                console.log(data.NIC);
                await AsyncStorage.setItem("qrt", data.NIC);
                props.navigation.navigate("ViewQuarantine");
              }}
            >
              <Icons name="home" color="#ffffff" size={20} />
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  paddingTop: 3,
                  marginLeft: 8,
                }}
              >
                Quarantine
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.cardbtn}
              onPress={async () => {
                console.log(data.NIC);
                await AsyncStorage.setItem("qrt", data.NIC);
                props.navigation.navigate("Quarantine");
              }}
            >
              <Icons name="home" color="#ffffff" size={20} />
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  paddingTop: 3,
                  marginLeft: 8,
                }}
              >
                Quarantine
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.cardbtn}
            onPress={async () => {
              console.log(data.NIC);
              await AsyncStorage.setItem("qrt", data.NIC);
              props.navigation.navigate("Vaccinate");
            }}
          >
            <Icons name="home" color="#ffffff" size={20} />
            <Text
              style={{
                color: COLORS.white,
                fontSize: 18,
                paddingTop: 3,
                marginLeft: 8,
              }}
            >
              Vaccinate
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  const renderCenters = () => {
    return (
      <ScrollView
        style={{ paddingHorizontal: 10, marginTop: 20, marginBottom: 50 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <FlatList
          style={{ marginTop: 10, marginBottom: 10 }}
          data={users}
          renderItem={({ item }) => {
            return renderList(item);
          }}
          keyExtractor={(item) => item.email}
          // onRefresh={() => getData()}
          // refreshing={loading}
        />
      </ScrollView>
    );
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
              Patient
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
      <View style={styles.scrollcontainer}>{renderCenters()}</View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 18,
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal: 20,
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  cardbtn: {
    width: 130,
    height: 30,
    borderRadius: 10,
    paddingLeft: 5,
    alignItems: "center",
    marginTop: 5,
    backgroundColor: COLORS.green,
    flexDirection: "row",
  },
});
