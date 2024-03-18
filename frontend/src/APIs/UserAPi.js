import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/* Handles all user info calls such as
   get by username, register and login.
   Also handles user game stats and saveGame */
class UserAPI {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:",BASE_URL, endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params})).data;
    } catch (e) {
      console.error("API Error:", e);
    }
  }

  static async getUser(username){
    const response = await this.request('users', username,'get')
    return response;
  }

  static async register(data){
    const response = await this.request("users/register", data, "post")
    return response
    }

  static async login(data){
      const response = await this.request("users/login", data, "post")
      console.log("RESPONSE USERAPI:", response);
      return response;
  }

  static async saveGame(user_id, score, category){
    const response = await this.request("game/save", {user_id,score,category}, "post")
    return response;
  }

  static async getLowScore(user_id){
    
    const response = await this.request(`game/lowscore/${user_id}`)
    return response;
  }

  static async getHighScore(user_id){
    
    const response = await this.request(`game/highscore/${user_id}`)
    return response;
  }
}
  
export default UserAPI;
