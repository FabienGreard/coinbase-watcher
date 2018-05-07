import { headers, restUrls } from '../helpers';

const requestOptions = {
  method: 'GET',
  headers: new headers()
};

const getProducts = async (endpoint = restUrls.sandbox) => {
  console.log(requestOptions);
  try {
    const response = await fetch(endpoint + '/products', requestOptions);
    return response.json();
  } catch (e) {
    return e;
  }
};

const getProductOrderBook = async (
  endpoint = restUrls.sandbox,
  id = 'ETH-EUR',
  level = 1
) => {
  try {
    const response = await fetch(
      endpoint + '/products/' + id + '/book?level=' + level,
      requestOptions
    );
    return response.json();
  } catch (e) {
    return e;
  }
};

const getProductTicker = async (
  endpoint = restUrls.sandbox,
  id = 'ETH-EUR'
) => {
  try {
    const response = await fetch(
      endpoint + '/products/' + id + '/ticker',
      requestOptions
    );
    return response.json();
  } catch (e) {
    return e;
  }
};

const getTrades = async (endpoint = restUrls.sandbox, id = 'ETH-EUR') => {
  try {
    const response = await fetch(
      endpoint + '/products/' + id + '/trades',
      requestOptions
    );
    return response.json();
  } catch (e) {
    return e;
  }
};

const getHistoricRates = async (
  endpoint = restUrls.sandbox,
  id = 'ETH-EUR',
  granularity = 3600
) => {
  try {
    const response = await fetch(
      endpoint + '/products/' + id + '/candles?granularity=' + granularity,
      requestOptions
    );
    return response.json();
  } catch (e) {
    return e;
  }
};

const get24hrStats = async (endpoint = restUrls.sandbox, id = 'ETH-EUR') => {
  try {
    const response = await fetch(
      endpoint + '/products/' + id + '/stats',
      requestOptions
    );
    return response.json();
  } catch (e) {
    return e;
  }
};

const getCurrencies = async (endpoint = restUrls.sandbox) => {
  try {
    const response = await fetch(endpoint + '/currencies', requestOptions);
    return response.json();
  } catch (e) {
    return e;
  }
};

const getTime = async (endpoint = restUrls.sandbox) => {
  try {
    const response = await fetch(endpoint + '/time', requestOptions);
    return response.json();
  } catch (e) {
    return e;
  }
};

export const gdaxPublicApiService = {
  getProducts,
  getProductOrderBook,
  getProductTicker,
  getTrades,
  getHistoricRates,
  get24hrStats,
  getCurrencies,
  getTime
};
