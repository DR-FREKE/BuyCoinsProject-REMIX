const URL = "https://api.coinlore.com/api/tickers/";

export const makeRequest = async () => {
  const response = await fetch(URL);
  if (response.ok) {
    const { data } = await response.json();
    return data;
  } else {
    throw new Error();
  }
};
