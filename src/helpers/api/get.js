import axios from "axios";
const baseUrl = "https://rickandmortyapi.com/api";

export const get = async ({ option, page, id }) => {
  try {
    const queryParam = page ? `?page=${page}` : `${id}`;
    const url = `${baseUrl}/${option}/${queryParam}`;
    const response = await axios.get(url);

    if (response.status >= 400) throw new Error("Request rejected");

    return response.data;
  } catch (error) {
    console.error(error);

    return [];
  }
};
