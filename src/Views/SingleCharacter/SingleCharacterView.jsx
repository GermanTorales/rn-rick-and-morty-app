import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";

const SingleCharacterView = ({ character }) => (
  <Card style={styles.container}>
    <Card.Title>{character.title}</Card.Title>
    <View style={styles.dataInfo}>
      <View>
        <Image style={styles.image} resizeMode="cover" source={{ uri: character.image }} />
      </View>
      <View>
        {character?.text?.map(([field, value], inx) => (
          <Text key={inx} style={styles.characterInfoText}>
            {field}: {value}
          </Text>
        ))}
      </View>
    </View>
  </Card>
);

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

export default SingleCharacterView;
