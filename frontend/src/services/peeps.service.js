import axios from "axios";

const apiURL = import.meta.env.VITE_APP_API_URL;

export const getPeeps = async () => {
  try {
    const response = await axios.get(`${apiURL}/peep`);
    return { peepData: response.data };
  } catch (error) {
    return { peepData: [], error: error.message };
  }
};

export const newPeep = async (content, token) => {
  try {
    await axios.post(
      `${apiURL}/newPeep`,
      { content },
      {
        headers: {
          "x-access-token": token,
        },
      },
    );
  } catch (error) {
    return {
      status: error.response?.status,
      error: { type: "post", message: error.response?.message },
    };
  }
};
