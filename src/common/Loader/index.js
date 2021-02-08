import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = (size) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator size={size} color="#ffffff" />
  </View>
);

export default Loader;
