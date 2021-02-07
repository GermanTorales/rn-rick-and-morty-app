import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = (size) => (
  <View style={styles.loader}>
    <ActivityIndicator size={size} color="#ffffff" />
  </View>
);

const styles = StyleSheet.create({
  loader: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default Loader;
