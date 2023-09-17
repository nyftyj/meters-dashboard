import {
  APIKEY,
  URL,
  UPDATE_METER_FORM,
  DELETE_METER_FORM,
  CREATE_METER_FORM,
  apiMap,
} from "../constants.js";

const fetchMeter = async (type, payload, id) => {
  const endpoint =
    type === UPDATE_METER_FORM || type === DELETE_METER_FORM
      ? URL + `/${id}`
      : URL;

  const body = type === CREATE_METER_FORM || type === UPDATE_METER_FORM ? { ...payload } : {}

  const response = await fetch(endpoint, {
    method: apiMap[type],
    headers: {
      "API-KEY": APIKEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
};

export default fetchMeter;
