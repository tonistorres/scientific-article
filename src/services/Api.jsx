import axios from "axios";

export const apiCore = axios.create({
  baseURL: "https://api.core.ac.uk/v3/search/works?apiKey=gStcq4C7GFURIwHQNryKTn9osuJ6DA5h",
});

export const apiCoreEndPoint =axios.create({
  baseURL: "https://core.ac.uk:443/api-v2/search/%22search/data-providers%22?page=3&pageSize=10&apiKey=",
})