import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIZES, COLORS } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { database } from "../../src/config/firebase";

export default function Current() {
  const [dose, setDose] = useState("");
  const [vaccine, setVaccine] = useState("");
  const [nextdate, setNext] = useState("");
  const [quarantined, setQuarantined] = useState("");
  const [end_date, setEnd] = useState("");
  const [start_date, setStart] = useState("");
  const [remaining, setRemaining] = useState("");
  const [loading, setloading] = useState(true);

  const getData = async () => {
    const nic = await AsyncStorage.getItem("nic");
    database
      .collection("users")
      .where("NIC", "==", nic)
      .get()
      .then((query) => {
        if (query.size > 0) {
          query.forEach((element) => {
            let user = element.data();
            let uid = element.id;
            setDose(user.dose);
            setVaccine(user.vaccine);
            setNext(user.next_vaccine_date);
            setQuarantined(user.quarantined);
          });
        }
      });
    database
      .collection("quarantine")
      .where("user", "==", nic)
      .get()
      .then((query) => {
        query.forEach((element) => {
          let user = element.data();
          setStart(user.start_date);
          setEnd(user.end_date);
          let edate = parseInt(user.end_date.slice(8, 10));
          let sdate = parseInt(user.start_date.slice(8, 10));
          let emonth = parseInt(user.end_date.slice(5, 7));
          let smonth = parseInt(user.start_date.slice(5, 7));
          let d;
          if (emonth === smonth) {
            d = edate - sdate;
          } else {
            d = edate + (30 - sdate);
          }
          setRemaining(d);
        });
      });
    setloading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
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
                <Text
                  style={{ color: COLORS.white, marginLeft: 20, fontSize: 23 }}
                >
                  My Health
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
                marginTop: 20,
              }}
            >
              {/* ************ Response Alert CARD ************* */}
              <View
                style={{
                  marginBottom: SIZES.radius,
                  borderRadius: SIZES.radius * 2,
                  paddingHorizontal: SIZES.padding / 2,
                  marginHorizontal: 10,
                  paddingVertical: SIZES.radius,
                  backgroundColor: COLORS.white,
                  borderWidth: SIZES.borderWidth,
                  height: 200,
                  width: "95%",
                  borderColor: COLORS.green,
                  elevation: SIZES.elevation,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  >
                    <Image
                      style={{ width: 80, height: 80 }}
                      source={require("../../assets/icons8-covid-19-64.png")}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      marginTop: 5,
                      marginLeft: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.green,
                          fontSize: 20,
                        }}
                      >
                        Dose No. :
                      </Text>
                      <Text
                        style={{
                          color: COLORS.green,
                          fontSize: 20,
                        }}
                      >
                        {dose}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.green,
                          fontSize: 20,
                        }}
                      >
                        Vaccine :
                      </Text>
                      <Text
                        style={{
                          color: COLORS.green,
                          fontSize: 20,
                        }}
                      >
                        {vaccine}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.green,
                          fontSize: 20,
                        }}
                      >
                        Next Date :
                      </Text>
                      <Text
                        style={{
                          color: COLORS.green,
                          fontSize: 20,
                        }}
                      >
                        {nextdate}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {quarantined === "true" ? (
                <View
                  style={{
                    marginBottom: SIZES.radius,
                    borderRadius: SIZES.radius * 2,
                    paddingHorizontal: SIZES.padding / 2,
                    marginHorizontal: 10,
                    paddingVertical: SIZES.radius,
                    backgroundColor: COLORS.white,
                    borderWidth: SIZES.borderWidth,
                    marginTop: 20,
                    height: 200,
                    width: "95%",
                    borderColor: COLORS.green,
                    elevation: SIZES.elevation,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.green,
                      fontSize: 20,
                      alignSelf: "center",
                    }}
                  >
                    You are quarantined
                  </Text>
                  <Text
                    style={{
                      color: COLORS.green,
                      fontSize: 20,
                      alignSelf: "center",
                    }}
                  >
                    Stay Home!
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.green,
                        fontSize: 20,
                      }}
                    >
                      Start Date :
                    </Text>
                    <Text
                      style={{
                        color: COLORS.green,
                        fontSize: 20,
                      }}
                    >
                      {start_date}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.green,
                        fontSize: 20,
                      }}
                    >
                      End Date :
                    </Text>
                    <Text
                      style={{
                        color: COLORS.green,
                        fontSize: 20,
                      }}
                    >
                      {end_date}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.green,
                        fontSize: 20,
                      }}
                    >
                      Remaining Days :
                    </Text>
                    <Text
                      style={{
                        color: COLORS.green,
                        fontSize: 20,
                      }}
                    >
                      {remaining}
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    marginBottom: SIZES.radius,
                    borderRadius: SIZES.radius * 2,
                    paddingHorizontal: SIZES.padding / 2,
                    marginHorizontal: 10,
                    paddingVertical: SIZES.radius,
                    backgroundColor: COLORS.white,
                    borderWidth: SIZES.borderWidth,
                    marginTop: 20,
                    height: 200,
                    width: "95%",
                    borderColor: COLORS.green,
                    elevation: SIZES.elevation,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.green,
                      fontSize: 20,
                      alignSelf: "center",
                    }}
                  >
                    You are not quarantined
                  </Text>
                  <Text
                    style={{
                      color: COLORS.green,
                      fontSize: 20,
                      alignSelf: "center",
                    }}
                  >
                    Stay Safe!
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
