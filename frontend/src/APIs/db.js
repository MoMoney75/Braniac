const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://brainiac-me99.onrender.com"
    : "http://localhost:3001";


console.log("DATABASE:", BASE_URL)


export default BASE_URL;