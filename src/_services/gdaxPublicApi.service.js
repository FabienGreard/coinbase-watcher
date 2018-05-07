import { restUrls } from '../helpers';

const headers = { 'Content-Type': 'application/json' };

const getProducts = async (endpoint = restUrls.sandbox) => {
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

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
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

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
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

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
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

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
      endpoint + '/products/' + id + '/candles?granularity=' + granularity
    );
    return response.json();
  } catch (e) {
    return e;
  }
};

const get24hrStats = async (endpoint = restUrls.sandbox, id = 'ETH-EUR') => {
  try {
    const response = await fetch(endpoint + '/products/' + id + '/stats');
    return response.json();
  } catch (e) {
    return e;
  }
};

const getCurrencies = async (endpoint = restUrls.sandbox) => {
  try {
    const response = await fetch(endpoint + '/currencies');
    return response.json();
  } catch (e) {
    return e;
  }
};

const getTime = async (endpoint = restUrls.sandbox) => {
  try {
    const response = await fetch(endpoint + '/time');
    return response.json();
  } catch (e) {
    return e;
  }
};

export const gdaxService = {
  getProducts,
  getProductOrderBook,
  getProductTicker,
  getTrades,
  getHistoricRates,
  get24hrStats,
  getCurrencies,
  getTime
};
