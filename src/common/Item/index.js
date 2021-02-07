import React from "react";
import { Image, TouchableWithoutFeedback, View, StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";

const imagesHeight = 100;
const imagesWidth = 100;

const Item = ({ handlePress, data }) => (
  <TouchableWithoutFeedback onPress={() => handlePress(data)}>
    <Card style={styles.container}>
      <Card.Title>{data.title}</Card.Title>
      <View style={styles.dataInfo}>
        <View>
          <Image style={styles.dataImage} resizeMode="cover" source={{ uri: data.image }} />
        </View>
        <View>
          {data?.text?.map(([field, value], inx) => (
            <Text key={inx} style={styles.characterInfoText}>
              {field}: {value}
            </Text>
          ))}
        </View>
      </View>
    </Card>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    marginTop: 10,
    paddingLeft: 5,
  },
  dataInfo: {
    display: "flex",
    flexDirection: "row",
  },
  dataImage: {
    // flex: 1,
    width: imagesWidth,
    height: imagesHeight,
  },
  characterName: {
    display: "flex",
    flexDirection: "column",
  },
  characterInfoText: {
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 10,
  },
  characterButton: {
    paddingTop: 10,
  },
});

export default Item;
