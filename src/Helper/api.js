import axios from "axios";

const API = axios.create({
  baseURL: "http://31.220.54.154/api",
});

export const getImageResponse = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return await API.post("/analyze-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const testAPI = () => {
  return API.get("/users");
};
