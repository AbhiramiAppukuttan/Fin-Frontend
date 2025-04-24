import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getToken } from "../utils/storageHandler";

axios.defaults.withCredentials = true;

// Fetch all notifications
export const viewNotificationAPI = async () => {
  const userToken = getToken();
  const response = await axios.get(`${BASE_URL}/notification/viewall`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};

// ✅ Mark a single notification as read

export const markAsReadAPI = async (id) => {
  const userToken = getToken();
  await axios.put(`${BASE_URL}/notification/update`, { id }, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
};



// ✅ Mark all notifications as read

export const markAllAsReadAPI = async () => {
  const userToken = getToken();
  await axios.put(`${BASE_URL}/notification/readall`, {}, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
};


// ✅ Update notification (If this is needed)
export const updateNotificationAPI = async (data) => {
  const userToken = getToken();
  console.log(data);

  const response = await axios.put(`${BASE_URL}/notification/update`, data, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};


export const spendingsAPI = async () => {
  const userToken = getToken();
  const response = await axios.get(`${BASE_URL}/notification/spending`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};

export const savingsAPI = async () => {
  const userToken = getToken();
  const response = await axios.get(`${BASE_URL}/notification/savings`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data;
};