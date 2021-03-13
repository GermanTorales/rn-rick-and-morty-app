import React, { useEffect, useState, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Width } from "../../common/generalStyles";
import Item from "../../common/Item";
import ComponentWithLinearGradient from "../../common/LinearGradient";
import Loader from "../../common/Loader";
import { getEpisodes } from "../../helpers/api";

const Episodes = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [haveNext, setHaveNext] = useState(true);
  const flatListRef = useRef();

  const toTop = () => flatListRef.current.scrollToOffset({ animated: true, offset: 0 });

  const setData = async (pageNumber) => {
    const data = await getEpisodes(pageNumber);

    setHaveNext(Boolean(data?.info?.next));

    const newData = data?.results?.map(({ name, air_date, episode, characters, id }) => {
      return {
        id,
        title: name,
        text: [
          ["Episode", episode],
          ["Air date", air_date],
          ["Characters count", characters.length],
        ],
      };
    });

    setEpisodes(newData);
    toTop();
  };

  const onLoadMoreData = async () => {
    setPage(page + 1);

    haveNext && (await setData(page));
  };

  const handlePress = (id) => {
    navigation.navigate("SingleEpisode", {
      episodeId: id,
    });
  };

  const renderEpisodes = ({ item }) => <Item handlePress={handlePress} data={item} />;

  useEffect(() => {
    let mounted = true;

    const fn = async () => {
      if (mounted) await setData(page);
    };

    fn();

    return () => (mounted = false);
  }, []);

  const component = () => (
    <FlatList
      ref={flatListRef}
      style={styles.container}
      data={episodes}
      renderItem={renderEpisodes}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={onLoadMoreData}
      ListFooterComponent={haveNext ? Loader("large") : null}
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

export default Episodes;
