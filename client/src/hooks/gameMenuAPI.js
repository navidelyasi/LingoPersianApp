import axios from "axios";

const BASE_URL = "http://localhost:3000/game";

const getAuthHeader = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem("user-token")}`,
  },
});

export const gameMenuAPI = {
  async listGames() {
    const response = await axios.get(`${BASE_URL}/list`, getAuthHeader());
    return response.data;
  },

  async createGame() {
    const response = await axios.post(
      `${BASE_URL}/create-game`,
      {},
      getAuthHeader()
    );
    return response.data;
  },

  async addPlayer(gameid) {
    const response = await axios.post(
      `${BASE_URL}/add-player`,
      { gameid },
      getAuthHeader()
    );
    return response.data;
  },

  async removePlayer(gameid) {
    const response = await axios.post(
      `${BASE_URL}/remove-player`,
      { gameid },
      getAuthHeader()
    );
    return response.data;
  },

  async removeGame(gameid) {
    const response = await axios.post(
      `${BASE_URL}/remove-game`,
      { gameid },
      getAuthHeader()
    );
    return response.data;
  },

  async startGame(gameid) {
    const response = await axios.post(
      `${BASE_URL}/start-game`,
      { gameid },
      getAuthHeader()
    );
    return response.data;
  },

  async getGameById(gameid) {
    const response = await axios.get(`${BASE_URL}/get-game-by-id`, {
      params: { gameid },
      ...getAuthHeader(),
    });
    return response.data;
  },

  async updateActivePlayer(gameid, activePlayerIndex) {
    const response = await axios.post(
      `${BASE_URL}/update-active-player`,
      { gameid, activePlayerIndex },
      getAuthHeader()
    );
    return response.data;
  },
};
