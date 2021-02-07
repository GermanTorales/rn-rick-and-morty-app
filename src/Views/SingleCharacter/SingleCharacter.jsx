import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { LinearColors } from "../../common/generalStyles";

const SingleCharacter = ({ route }) => {
  const { character } = route.params;
  const { gender, origin, location, species, status, type, episode } = character;
  const info = [
    ["Gender", gender],
    ["Species", species],
    ["Type", type],
    ["Born in", origin.name],
    ["Living in", location.name],
    ["Status", status],
    ["Episodes of appearance", episode.length],
  ];

  return (
    <LinearGradient colors={LinearColors} style={styles.linearGradient}>
      <Card>
        <Card.Title style={{ fontSize: 30 }}>{character.name}</Card.Title>
        <Card.Divider />
        <View>
          <Image style={styles.image} resizeMode="cover" source={{ uri: character.image }} />
        </View>
        {info.map(([field, data], i) => (
          <Text style={styles.infoText} key={i}>
            {field}: {data}
          </Text>
        ))}
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  linearGradient: {
      paddingTop: 50,
    width: "100%",
    height: "100%",
  },
  infoText: {
    fontSize: 16,
    paddingTop: 5,
  },
});

export default SingleCharacter;
