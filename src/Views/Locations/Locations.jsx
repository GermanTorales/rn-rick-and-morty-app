import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Width } from "../../common/generalStyles";
import Item from "../../common/Item";
import ComponentWithLinearGradient from "../../common/LinearGradient";
import Loader from "../../common/Loader";
import { getLocations } from "../../helpers/api";

const Locations = ({ navigation }) => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);

  const setData = async (pageNumber) => {
    const data = await getLocations(pageNumber);

    const newData = data?.results?.map(({ name, image, type, dimension, id }) => {
      name = name.length >= 13 ? name.substring(0, 13).concat("...") : name;
      dimension = dimension.length >= 13 ? dimension.substring(0, 13).concat("...") : dimension;

      return {
        id,
        title: name,
        image,
        text: [
          ["Location", name],
          ["Type", type],
          ["Dimension", dimension],
        ],
      };
    });

    const result = [...locations, ...newData];

    setLocations(result);
  };

  const onLoadMoreData = async () => {
    const newPage = page + 1;

    await setData(newPage);

    setPage(newPage);
  };

  const handlePress = (id) => {
    navigation.navigate("SingleLocation", {
      locationId: id,
    });
  };

  const renderLocation = ({ item }) => <Item handlePress={handlePress} data={item} />;

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
      style={styles.container}
      data={locations}
      renderItem={renderLocation}
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

export default Locations;
