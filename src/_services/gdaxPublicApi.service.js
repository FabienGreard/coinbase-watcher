import { url } from '../helpers';

const headers = { 'Content-Type': 'application/json' };

const getProducts = async (endpoint = url.sandboxeRest) => {
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
  endpoint = url.sandboxeRest,
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
  endpoint = url.sandboxeRest,
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

const getTrades = async (endpoint = url.sandboxeRest, id = 'ETH-EUR') => {
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
  endpoint = url.sandboxeRest,
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

const get24hrStats = async (endpoint = url.sandboxeRest, id = 'ETH-EUR') => {
  try {
    const response = await fetch(endpoint + '/products/' + id + '/stats');
    return response.json();
  } catch (e) {
    return e;
  }
};

const getCurrencies = async (endpoint = url.sandboxeRest) => {
  try {
    const response = await fetch(endpoint + '/currencies');
    return response.json();
  } catch (e) {
    return e;
  }
};

const getTime = async (endpoint = url.sandboxeRest) => {
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
