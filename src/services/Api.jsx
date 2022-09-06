import axios from "axios";

// export const apiCoreEndPoint = axios.create({
//   baseURL: "https://api.core.ac.uk/v3/search/works?apiKey=gStcq4C7GFURIwHQNryKTn9osuJ6DA5h",
// });

// export const apiCoreEndPoint =axios.create({
//   baseURL: "https://core.ac.uk:443/api-v2/search/title:covid?page=3&pageSize=10&apiKey=gStcq4C7GFURIwHQNryKTn9osuJ6DA5h",
// })


export const apiCoreEndPoint =axios.create({
  baseURL: "https://core.ac.uk:443/api-v2/search/title:psychology and language.name:English?page=3&pageSize=10&apiKey=gStcq4C7GFURIwHQNryKTn9osuJ6DA5h",
})

