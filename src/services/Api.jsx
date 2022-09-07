import axios from "axios";

export const apiCoreEndPoint = axios.create({
  baseURL: `https://core.ac.uk:443/api-v2/search/works?apiKey=${process.env.REACT_APP_API_KEY}`,
});

// export const apiCoreEndPoint =axios.create({
//   baseURL: "https://core.ac.uk:443/api-v2/search/title:covid?page=3&pageSize=10&apiKey=gStcq4C7GFURIwHQNryKTn9osuJ6DA5h",
// })
const API= axios.create({baseURL:'https://core.ac.uk:443/api-v2/search'});

export const getWorks = async (endpoint) => {
  const data = await API.get(endpoint)
    .then((response) => response.data.data);
  return data;
};


// export const apiCoreEndPoint =axios.create({
//   baseURL: "https://core.ac.uk:443/api-v2/search/title:psychology and language.name:English?page=3&pageSize=10&apiKey=gStcq4C7GFURIwHQNryKTn9osuJ6DA5h",
// })

