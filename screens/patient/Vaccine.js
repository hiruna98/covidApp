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
  Alert,
} from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, FAB } from "react-native-paper";
import { database } from "../../src/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Vaccine() {
  const [centers, setCenters] = useState([]);
  const [available, setavailable] = useState(false);

  async function getData() {
    const district = await AsyncStorage.getItem("district");
    database
      .collection("centers")
      .where("district", "==", district)
      .get()
      .then((query) => {
        let arr = [];
        if (query.size > 0) {
          setavailable(true);
          query.forEach((element) => {
            arr.push(element);
          });
          setCenters(arr);
        } else {
        }
      });
  }

  useEffect(() => {
    getData();
  }, []);
  const renderList = (item) => {
    const data = item.data();
    const name = data.name;
    const age = data.age;
    const dose = data.dose;
    const vaccine = data.vaccine;
    const province = data.province;
    const district = data.district;
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
          height: 150,
          width: Dimensions.get("window").width - 30,
          borderColor: COLORS.green,
          elevation: SIZES.elevation,
        }}
        onPress={() =>
          props.navigation.navigate(
            "UpdateCenter",
            name,
            age,
            dose,
            vaccine,
            province,
            district
          )
        }
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
            {data.name}
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
            {data.vaccine}
          </Text>
          <Text
            style={{
              color: COLORS.green,
              fontSize: 17,
              marginLeft: 5,
            }}
          >
            Dose {data.dose_no}
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
      </TouchableOpacity>
    );
  };
  const renderCenters = () => {
    return (
      <ScrollView
        style={{ paddingHorizontal: 10, marginTop: 20 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <FlatList
          style={{ marginTop: 10, marginBottom: 10 }}
          data={centers}
          renderItem={({ item }) => {
            return renderList(item);
          }}
          keyExtractor={(item) => item.id}
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
              Vaccine
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
      {available ? (
        <View style={styles.scrollcontainer}>{renderCenters()}</View>
      ) : (
        <View
          style={[
            styles.scrollcontainer,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text style={{ fontSize: 20 }}>No availble centers</Text>
        </View>
      )}
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
});
