import { url } from '../helpers';
import Gdax from 'gdax';

const getPublicClient = (productID = 'BTC-USD', endpoint = url.liveRest) => {
  return new Gdax.PublicClient(productID, endpoint);
};

const getSellPrice = async currency => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'CB-VERSION': '2018-04-06' }
  };

  const response = await fetch(
    url + '/prices/' + currency + '/sell',
    requestOptions
  );

  return response.json();
};

const getBuyPrice = async currency => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'CB-VERSION': '2018-04-06' }
  };

  const response = await fetch(
    url + '/prices/' + currency + '/buy',
    requestOptions
  );

  return response.json();
};

const getSpotPrice = async currency => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'CB-VERSION': '2018-04-06' }
  };

  const response = await fetch(
    url + '/prices/' + currency + '/spot',
    requestOptions
  );

  return response.json();
};

export const gdaxService = {
  getSellPrice,
  getBuyPrice,
  getSpotPrice
};
