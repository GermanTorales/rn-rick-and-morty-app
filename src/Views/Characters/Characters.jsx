import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { Width } from "../../common/generalStyles";
import { FlatList } from "react-native-gesture-handler";
import { getCharacters } from "../../helpers/api";
import Loader from "../../common/Loader";
import Item from "../../common/Item";
import ComponentWithLinearGradient from "../../common/LinearGradient";

const Characters = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [haveNext, setHaveNext] = useState(true);
  const flatListRef = useRef();

  const toTop = () => flatListRef.current.scrollToOffset({ animated: true, offset: 0 });

  const setData = async (pageNumber) => {
    const data = await getCharacters(pageNumber);

    setHaveNext(Boolean(data?.info?.next));

    const newData = data?.results?.map(({ name, image, species, status, id }) => ({
      id,
      title: name,
      image,
      text: [
        ["Full name", name],
        ["Specie", species],
        ["Status", status],
      ],
    }));

    setCharacters(newData);
    toTop();
  };

  const handlePress = (id) => {
    /* 
      Navigation es una parametro que nos da el Stack de navegacion
      que definimos en app.js
      Con su propiedad navigate le decimos a que vista queremos movernos
      Como segundo parametro le podemos pasar un objeto con data para la siguiente vista
    */
    navigation.navigate("SingleCharacter", {
      characterId: id,
    });
  };

  const onLoadMoreData = async () => {
    setPage(page + 1);

    haveNext && (await setData(page));
  };

  const renderCharacter = ({ item }) => <Item handlePress={handlePress} data={item} />;

  useEffect(() => {
    let mounted = true;

    const cb = async () => {
      if (mounted) await setData(page);
    };

    cb();

    return () => (mounted = false);
  }, []);

  const component = () => (
    <FlatList
      ref={flatListRef}
      style={styles.container}
      data={characters}
      renderItem={renderCharacter}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={onLoadMoreData}
      ListFooterComponent={Loader("large")}
    ></FlatList>
  );

  return ComponentWithLinearGradient(component);
};

const styles = StyleSheet.create({
  container: {
    width: Width,
    height: `100%`,
  },
});

export default Characters;
