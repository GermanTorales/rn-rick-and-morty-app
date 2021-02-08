import React from "react";
import { StyleSheet } from "react-native";
import { LinearColors, Width } from "../../common/generalStyles";
import { LinearGradient } from "expo-linear-gradient";

const ComponentWithLinearGradient = (component) => (
  <LinearGradient colors={LinearColors} style={styles.container}>
    {component()}
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: Width,
    height: `100%`,
  },
});

export default ComponentWithLinearGradient;
