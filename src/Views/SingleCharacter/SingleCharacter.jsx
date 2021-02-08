import React, { useEffect, useState } from "react";
import ComponentWithLinearGradient from "../../common/LinearGradient";
import { getCharacter } from "../../helpers/api";
import SingleCharacterView from "./SingleCharacterView";

const SingleCharacter = ({ route }) => {
  const [character, setCharacter] = useState({});

  const getData = async (id) => {
    const data = await getCharacter(id);

    const { gender, origin, location, species, status, type, episode, name, image } = data;

    const info = {
      title: name,
      image,
      text: [
        ["Gender", gender],
        ["Species", species],
        ["Type", type],
        ["Born in", origin.name],
        ["Living in", location.name],
        ["Status", status],
        ["Episodes of appearance", episode.length],
      ],
    };

    setCharacter(info);
  };

  useEffect(() => {
    let mounted = true;

    const fn = async () => {
      if (mounted) {
        const { characterId } = route.params;

        await getData(characterId);
      }
    };

    fn();

    return () => (mounted = false);
  }, []);

  const component = () => <SingleCharacterView character={character} />;

  return ComponentWithLinearGradient(component);
};

export default SingleCharacter;
