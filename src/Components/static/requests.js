import axios from "axios";

export const getBooksAPI = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/book");
    return response.data;
  } catch (e) {
    return undefined;
  }
};

export const getSingleBookAPI = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/book/${id}`);
    return response.data;
  } catch (e) {
    return undefined;
  }
};

export const postSingleBookRateAPI = async (id, rating) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/book/${id}/rate`,
      {
        score: parseFloat(rating),
      }
    );
    return response.data;
  } catch (e) {
    return undefined;
  }
};

export const postSingleBookAPI = async (values) => {
  try {
    const response = await axios.post("http://localhost:5000/api/book", values);
    return response.data;
  } catch (e) {
    return undefined;
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
    return undefined;
  }
};

export const deleteSingleBookAPI = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/book/${id}`);
    return response.data;
  } catch (e) {
    return undefined;
  }
};
