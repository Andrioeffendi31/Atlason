import axios from "axios";

const ROOT_URL = "https://restcountries.com";

export const fetchCountries = async () => {
  const data = await axios.get(`${ROOT_URL}/v3.1/all`);
  return data;
};

export const searchCountry = async (country) => {
  const data = await axios.get(`${ROOT_URL}/v3.1/alpha/${country}`);
  return data;
};
