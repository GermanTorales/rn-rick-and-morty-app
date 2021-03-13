import { get } from "./get";

export const getCharacters = async (page) => await get({ option: "character", page });
export const getLocations = async (page) => await get({ option: "location", page });
export const getEpisodes = async (page) => await get({ option: "episode", page });

export const getCharacter = async (id) => await get({ option: "character", id });
export const getLocation = async (id) => await get({ option: "location", id });
export const getEpisode = async (id) => await get({ option: "location", id });