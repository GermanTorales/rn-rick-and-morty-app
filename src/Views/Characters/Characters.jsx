import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LinearColors, Width } from "../../common/generalStyles";
import { FlatList } from "react-native-gesture-handler";
import { getCharacters, getPage } from "../../helpers/api";
import Loader from "../../common/Loader";
import Item from "../../common/Item";

const Characters = ({ navigation }) => {
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

  const renderCharacter = ({ item }) => <Item handlePress={handlePress} data={item} />;

  useEffect(() => {
    const cb = async () => {
      const data = await getPage(getCharacters, page);

      const newData = data?.results?.map(({ name, image, species, status }) => ({
        title: name,
        image,
        text: [
          ["Full name", name],
          ["Specie", species],
          ["Status", status],
        ],
      }));

      const result = [...characters, ...newData];

      setCharacters(result);
    };

    cb();
  }, [page]);

  return (
    <LinearGradient colors={LinearColors} style={styles.container}>
      <FlatList
        style={styles.container}
        data={characters}
        renderItem={renderCharacter}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onLoadMoreData}
        // onEndReachedThreshold={0}
        ListFooterComponent={Loader("large")}
      ></FlatList>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: `100%`,
  }
});

export default Characters;
