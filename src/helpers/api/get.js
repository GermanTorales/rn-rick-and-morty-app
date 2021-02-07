import axios from "axios";

export const get = async (option, page) => {
  const baseUrl = "https://rickandmortyapi.com/api";

  try {
    const response = await axios.get(`${baseUrl}/${option}/?page=${page}`);

    if (response.status >= 400) throw new Error("Request rejected");

    return response.data;
  } catch (error) {
    console.error(error);

    return []
  }
};
