import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Item from "../../common/Item";

const SingleLocationView = ({ location, handlePress }) => (
  <ScrollView>
    <Card style={styles.container}>
      <Card.Title style={styles.title}>{location.name}</Card.Title>
      <View>
        <Text style={styles.locationInfoText}>Dimension: {location.dimension}</Text>
        <Text style={styles.locationInfoText}>Type: {location.type}</Text>
        <Text style={styles.locationInfoText}>
          Number of inhabitants: {location?.residents?.length}
        </Text>
        <Text style={styles.subtitle}>Population</Text>
        {location?.residents?.map((resident, inx) => (
          <Item key={inx} handlePress={handlePress} data={resident} />
        ))}
      </View>
    </Card>
  </ScrollView>
);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontSize: 26,
  },
  locationInfoText: {
    fontSize: 18,
    paddingBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 22,
    paddingTop: 25,
    borderBottomWidth: 1,
  },
});

export default SingleLocationView;
