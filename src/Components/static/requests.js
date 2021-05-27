import axios from "axios";

export const getBooksAPI = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/book");
    return response.data;
  } catch (e) {
    return [];
  }
};

export const getSingleBookAPI = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/book/${id}`);
    return response.data;
  } catch (e) {
    return [];
  }
};

export const postSingleBookAPI = async (id, rating) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/book/${id}/rate`,
      {
        score: parseFloat(rating),
      }
    );
    return response.data;
  } catch (e) {
    return [];
  }
};

export const putSingleBookAPI = async (id, values) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/book/${id}`,
      values
    );
    return response.data;
  } catch (e) {
    return [];
  }
};
