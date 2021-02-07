import { get } from "./get";

export const getCharacters = async (page) => await get("character", page);
export const getLocations = async () => await get("location");
export const getEpisodes = async () => await get("episode");

export const getPage = async (fn, page) => {
  const data = await fn(page);

  return data;
};
