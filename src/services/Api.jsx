import axios from "axios";

export const apiCore = axios.create({
  baseURL: "https://api.core.ac.uk/v3/search/works?apiKey=gStcq4C7GFURIwHQNryKTn9osuJ6DA5h",
});