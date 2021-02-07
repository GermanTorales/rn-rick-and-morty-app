import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { ActivityIndicator, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Image } from "react-native-elements";
import { LinearColors, StatusColors } from "../../common/generalStyles";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";

const width = Dimensions.get("window").width; //full width
const imagesHeight = 100;
const imagesWidth = 100;

const Home = ({ navigation }) => {
  const baseUrl = "https://rickandmortyapi.com/api";
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  const handlePress = (character) => {
    /* 
      Navigation es una parametro que nos da el Stack de navegacion
      que definimos en app.js
      Con su propiedad navigate le decimos a que vista queremos movernos
      Como segundo parametro le podemos pasar un objeto con data para la siguiente vista
    */
    navigation.navigate("SingleCharacter", {
      character,
    });
  };

  const onLoadMoreData = () => setPage(page + 1);

  const getPage = async () => {
    const response = await axios.get(`${baseUrl}/character/?page=${page}`);
    const allData = [...characters, ...response.data.results];

    setCharacters(allData);
  };

  const renderCharacter = ({ item: character }) => {
    return (
      <TouchableWithoutFeedback onPress={() => handlePress(character)}>
        <Card style={styles.characterContainer}>
          <Card.Title>{character.name}</Card.Title>
          <View style={styles.characterInfo}>
            <View style={styles.user}>
              <Image
                style={styles.characterImage}
                resizeMode="cover"
                source={{ uri: character.image }}
              />
            </View>
            <View>
              <Text style={styles.characterInfoText}>Full name: {character.name}</Text>
              <Text style={styles.characterInfoText}>Specie: {character.species}</Text>
              <Text style={{ ...styles.characterInfoText, display: "flex", flexDirection: "row" }}>
                Status:{" "}
                <Text style={{ color: StatusColors[character.status] }}>{character.status}</Text>
              </Text>
            </View>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  const loader = () => (
    <View style={styles.loader}>
      <ActivityIndicator size='large' color="#ffffff"/>
    </View>
  );

  useEffect(() => {
    const cb = async () => getPage();

    cb();
  }, [page]);

  return (
    <LinearGradient colors={LinearColors} style={styles.linearGradient}>
      <FlatList
        style={styles.container}
        data={characters}
        renderItem={renderCharacter}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onLoadMoreData}
        // onEndReachedThreshold={0}
        ListFooterComponent={loader}
      ></FlatList>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width,
    height: `100%`,
  },
  linearGradient: {
    // flex: 1,
    width,
    height: "100%",
  },
  characterContainer: {
    width: "100%",
    height: 150,
    marginTop: 10,
    paddingLeft: 5,
  },
  characterImage: {
    // flex: 1,
    width: imagesWidth,
    height: imagesHeight,
  },
  characterName: {
    display: "flex",
    flexDirection: "column",
  },
  characterInfo: {
    display: "flex",
    flexDirection: "row",
  },
  characterInfoText: {
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 10,
  },
  characterButton: {
    paddingTop: 10,
  },
  loader:{
      marginTop: 10,
      alignItems: 'center'
  }
});

export default Home;
