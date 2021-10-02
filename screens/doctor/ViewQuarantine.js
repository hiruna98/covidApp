import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SIZES, COLORS } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { database } from "../../src/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-datepicker";

export default function ViewQuarantine(props) {
  const [NIC, setData] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [extend, setExtend] = useState("");
  const [docId, setDocId] = useState("");
  const [userId, setUser] = useState("");
  const [doc, setDoc] = useState("");
  const [loading, setloading] = useState(true);

  const getData = async () => {
    var nic = "";
    nic = await AsyncStorage.getItem("qrt");
    database
      .collection("users")
      .where("NIC", "==", nic)
      .get()
      .then((query) => {
        query.forEach((element) => {
          setUser(element.id);
        });
      });
    database
      .collection("quarantine")
      .where("user", "==", nic)
      .get()
      .then((query) => {
        query.forEach((element) => {
          const data = element.data();
          const id = element.id;
          setStart(data.start_date);
          setEnd(data.end_date);
          setDoc(element);
          setDocId(id);
        });
      });
    setloading(false);
    setData(nic);
  };
  useEffect(() => {
    getData();
  }, []);
  const finishData = () => {
    doc.ref.delete();
    database
      .collection("users")
      .doc(userId)
      .update({
        quarantined: "false",
      })
      .then((result) => {
        Alert.alert("Finished Successfully");
        props.navigation.navigate("Patient");
      });
  };
  const extendData = () => {
    database
      .collection("quarantine")
      .doc(docId)
      .update({
        end_date: extend,
      })
      .then(() => {
        Alert.alert("Extended Successfully");
        props.navigation.navigate("Patient");
      });
  };
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
            <View style={styles.headerContainer}>
              <TouchableOpacity>
                <MaterialIcons
                  name="arrow-back"
                  size={30}
                  color={COLORS.white}
                  style={{ marginLeft: 20 }}
                  onPress={() => {
                    props.navigation.navigate("Patient");
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.title}>Quarantine Details</Text>
            </View>
          </SafeAreaView>
          <View style={styles.scrollcontainer}>
            <ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 15,
                }}
              >
                <Text style={styles.lable}>Start Date</Text>
                <Text style={styles.lable}>{start}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 15,
                }}
              >
                <Text style={styles.lable}>End Date</Text>
                <Text style={styles.lable}>{end}</Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.buttonview,
                  {
                    right: 0,
                    marginHorizontal: 20,
                    borderColor: COLORS.green,
                    justifyContent: "center",
                    backgroundColor: COLORS.green,
                  },
                ]}
                onPress={finishData}
              >
                <Text style={{ color: COLORS.white, fontSize: 20 }}>
                  Finish
                </Text>
              </TouchableOpacity>
              <Text style={[styles.lable, { marginBottom: 5, marginTop: 25 }]}>
                New End Date
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    color: COLORS.green,
                    fontSize: 20,
                  }}
                  placeholder="2021-01-01"
                  value={extend}
                  onChangeText={(date) => setExtend(date)}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.buttonview,
                  {
                    right: 0,
                    marginHorizontal: 20,
                    borderColor: COLORS.green,
                    justifyContent: "center",
                    backgroundColor: COLORS.green,
                  },
                ]}
                onPress={extendData}
              >
                <Text style={{ color: COLORS.white, fontSize: 20 }}>
                  Extend
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
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
  scrollcontainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginLeft: 20,
    alignSelf: "center",
    color: COLORS.white,
  },
  lable: {
    fontSize: 18,
    marginLeft: 40,
    marginTop: 12,
    color: COLORS.green,
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
  headerContainer: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.green,
  },
  buttonview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
});
