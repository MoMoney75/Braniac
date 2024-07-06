/* Sets database URL based on process.env.NODE_ENV */
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://brainiac-me99.onrender.com"
    : "http://localhost:3001";

export default BASE_URL;