import React, { useEffect, useState } from "react";
import ComponentWithLinearGradient from "../../common/LinearGradient";
import Loader from "../../common/Loader";
import { getLocation, getCharacter } from "../../helpers/api";
import SingleCharacterView from "./SingleLocationView";

const SingleLocation = ({ route, navigation }) => {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);

  const getData = async (id) => {
    setLoading(true);

    const data = await getLocation(id);

    const residentsData = await data?.residents?.reduce(async (acc, url) => {
      acc = await acc;
      url = url.split("/");

      try {
        const id = url[url.length - 1];

        const promise = await getCharacter(id);

        return Promise.resolve([...acc, promise]);
      } catch (error) {
        console.error(error);

        return acc;
      }
    }, Promise.resolve([]));

    data.residents = residentsData.map(({ name, image, species, status, id }) => ({
      id,
      title: name,
      image,
      text: [
        ["Name", name],
        ["Specie", species],
        ["Status", status],
      ],
    }));

    setLocation(data);
    setLoading(false);
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

  useEffect(() => {
    let mounted = true;

    const fn = async () => {
      if (mounted) {
        const { locationId } = route.params;

        await getData(locationId);
      }
    };

    fn();

    return () => (mounted = false);
  }, []);

  const component = () =>
    loading ? (
      Loader("large")
    ) : (
      <SingleCharacterView location={location} handlePress={handlePress} />
    );

  return ComponentWithLinearGradient(component);
};

export default SingleLocation;
