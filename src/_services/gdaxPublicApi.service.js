import { url } from '../helpers';
import Gdax from 'gdax';

const getPublicClient = (endpoint = url.sandboxeRest) => {
  return new Gdax.PublicClient(endpoint);
};

const getProductHistoricRates = async (
  currency = 'ETH-EUR',
  granularity = { granularity: 3600 }
) => {
  try {
    const response = await getPublicClient().getProductHistoricRates(
      currency,
      granularity
    );

    return response;
  } catch (e) {
    return e;
  }
};

export const gdaxService = {
  getProductHistoricRates
};
