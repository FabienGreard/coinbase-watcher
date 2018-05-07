import { headers, restUrls } from '../helpers';

const getAccounts = async (endpoint = restUrls.sandbox) => {
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  try {
    const response = await fetch(endpoint + '/accounts', requestOptions);
    return response.json();
  } catch (e) {
    return e;
  }
};

export const gdaxPrivateApiService = {
  getAccounts
};
