import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome5";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import Register from "./screens/Register";

import PHome from "./screens/patient/PHome";
import Profile from "./screens/patient/Profile";
import Vaccine from "./screens/patient/Vaccine";
import Emergency from "./screens/patient/Emergency";
import Current from "./screens/patient/Current";

import DHome from "./screens/doctor/DHome";
import DEmergency from "./screens/doctor/Emergency";
import Patient from "./screens/doctor/Patient";
import DProfile from "./screens/doctor/Profile";
import DVaccine from "./screens/doctor/Vaccine";
import UpdateProfile from "./screens/doctor/UpdateProfile";
import AddCenter from "./screens/doctor/AddCenter";
import UpdateCenter from "./screens/doctor/UpdateCenter";
import Quarantine from "./screens/doctor/Quarantine";
import ViewQuarantine from "./screens/doctor/ViewQuarantine";
import Vaccinate from "./screens/doctor/Vaccinate";

const doctorTabs = createBottomTabNavigator();
const patientTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const navoption = {
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#4636ff",
  },
};

export default function App() {
  const [usertype, setUsertype] = useState("doctor");
  const [loading, setloading] = useState(true);
  const [islogged, setIslogged] = useState(false);
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const getData = async () => {
    try {
      var type = "";
      type = await AsyncStorage.getItem("type");
      if (type) {
        setIslogged(true);
      } else {
        setIslogged(false);
      }
      setUsertype(type);
      setloading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  });
  function getWidth() {
    let width = Dimensions.get("window").width - 40;
    return width / 5;
  }

  const doctorNav = () => {
    return (
      <>
        <doctorTabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Emergency") {
                iconName = focused ? "warning" : "warning-outline";
              } else if (route.name === "Patient") {
                iconName = focused ? "people" : "people-outline";
              } else if (route.name === "Vaccine") {
                iconName = focused ? "syringe" : "syringe";
                return <Icons name={iconName} size={size} color={color} />;
              } else if (route.name === "DProfile") {
                iconName = focused ? "ios-settings" : "ios-settings-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              position: "absolute",
              height: 60,
              bottom: 0,
              paddingHorizontal: 15,
            },
          })}
        >
          <doctorTabs.Screen
            name={"Home"}
            component={DHome}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 0,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <doctorTabs.Screen
            name={"Emergency"}
            component={DEmergency}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 1 + 3,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <doctorTabs.Screen
            name={"Patient"}
            component={Patient}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 2 + 6,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <doctorTabs.Screen
            name={"Vaccine"}
            component={DVaccine}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 3 + 5,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <doctorTabs.Screen
            name={"DProfile"}
            component={DProfile}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 4 + 5,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
        </doctorTabs.Navigator>
        <Animated.View
          style={{
            width: getWidth() - 10,
            height: 5,
            backgroundColor: "red",
            position: "absolute",
            bottom: 58,
            left: 20,
            zIndex: 1,
            transform: [{ translateX: tabOffsetValue }],
          }}
        />
      </>
    );
  };
  const patientNav = () => {
    return (
      <>
        <patientTabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Emergency") {
                iconName = focused ? "warning" : "warning-outline";
              } else if (route.name === "Current") {
                iconName = focused ? "people" : "people-outline";
              } else if (route.name === "Vaccine") {
                iconName = focused ? "syringe" : "syringe";
                return <Icons name={iconName} size={size} color={color} />;
              } else if (route.name === "Profile") {
                iconName = focused ? "ios-settings" : "ios-settings-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              position: "absolute",
              height: 60,
              bottom: 0,
              paddingHorizontal: 15,
            },
          })}
        >
          <patientTabs.Screen
            name={"Home"}
            component={PHome}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 0,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <patientTabs.Screen
            name={"Emergency"}
            component={Emergency}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 1 + 3,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <patientTabs.Screen
            name={"Vaccine"}
            component={Vaccine}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 2 + 6,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <patientTabs.Screen
            name={"Current"}
            component={Current}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 3 + 5,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <patientTabs.Screen
            name={"Profile"}
            component={Profile}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 4 + 5,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
        </patientTabs.Navigator>
        <Animated.View
          style={{
            width: getWidth() - 10,
            height: 5,
            backgroundColor: "red",
            position: "absolute",
            bottom: 58,
            left: 20,
            zIndex: 1,
            transform: [{ translateX: tabOffsetValue }],
          }}
        />
      </>
    );
  };
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Stack.Navigator>
            {islogged ? (
              <>
                {usertype === "doctor" ? (
                  <>
                    <Stack.Screen
                      name="doctorNav"
                      component={doctorNav}
                      options={{
                        ...navoption,
                        title: "doctorNav",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="ViewQuarantine"
                      component={ViewQuarantine}
                      options={{
                        ...navoption,
                        title: "ViewQuarantine",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="Vaccinate"
                      component={Vaccinate}
                      options={{
                        ...navoption,
                        title: "Vaccinate",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="UpdateProfile"
                      component={UpdateProfile}
                      options={{
                        ...navoption,
                        title: "UpdateProfile",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="Quarantine"
                      component={Quarantine}
                      options={{
                        ...navoption,
                        title: "Quarantine",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="AddCenter"
                      component={AddCenter}
                      options={{
                        ...navoption,
                        title: "AddCenter",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="UpdateCenter"
                      component={UpdateCenter}
                      options={{
                        ...navoption,
                        title: "UpdateCenter",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="patientNav"
                      component={patientNav}
                      options={{
                        ...navoption,
                        title: "patientNav",
                        headerShown: false,
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen
                      name="patientNav"
                      component={patientNav}
                      options={{
                        ...navoption,
                        title: "patientNav",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="UpdateProfile"
                      component={UpdateProfile}
                      options={{
                        ...navoption,
                        title: "UpdateProfile",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="Vaccinate"
                      component={Vaccinate}
                      options={{
                        ...navoption,
                        title: "Vaccinate",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="UpdateCenter"
                      component={UpdateCenter}
                      options={{
                        ...navoption,
                        title: "UpdateCenter",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="ViewQuarantine"
                      component={ViewQuarantine}
                      options={{
                        ...navoption,
                        title: "ViewQuarantine",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="AddCenter"
                      component={AddCenter}
                      options={{
                        ...navoption,
                        title: "AddCenter",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="Quarantine"
                      component={Quarantine}
                      options={{
                        ...navoption,
                        title: "Quarantine",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="doctorNav"
                      component={doctorNav}
                      options={{
                        ...navoption,
                        title: "doctorNav",
                        headerShown: false,
                      }}
                    />
                  </>
                )}
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{
                    ...navoption,
                    title: "Login",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{
                    ...navoption,
                    title: "Register",
                    headerShown: false,
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{
                    ...navoption,
                    title: "Login",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{
                    ...navoption,
                    title: "Register",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="UpdateCenter"
                  component={UpdateCenter}
                  options={{
                    ...navoption,
                    title: "UpdateCenter",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Quarantine"
                  component={Quarantine}
                  options={{
                    ...navoption,
                    title: "Quarantine",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Vaccinate"
                  component={Vaccinate}
                  options={{
                    ...navoption,
                    title: "Vaccinate",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="ViewQuarantine"
                  component={ViewQuarantine}
                  options={{
                    ...navoption,
                    title: "ViewQuarantine",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="doctorNav"
                  component={doctorNav}
                  options={{
                    ...navoption,
                    title: "doctorNav",
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="patientNav"
                  component={patientNav}
                  options={{
                    ...navoption,
                    title: "patientNav",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="UpdateProfile"
                  component={UpdateProfile}
                  options={{
                    ...navoption,
                    title: "UpdateProfile",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="AddCenter"
                  component={AddCenter}
                  options={{
                    ...navoption,
                    title: "AddCenter",
                    headerShown: false,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        )}
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },
});
