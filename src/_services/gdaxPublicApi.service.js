import { url } from '../helpers';
import Gdax from 'gdax';

const getPublicClient = endpoint => {
  return new Gdax.PublicClient(endpoint);
};

const getProductHistoricRates = async (
  endpoint = url.sandboxeRest,
  currency = 'ETH-EUR',
  granularity = 3600
) => {
  try {
    const response = await getPublicClient(endpoint).getProductHistoricRates(
      currency,
      {
        granularity: granularity
      }
    );

    return response;
  } catch (e) {
    return e;
  }
};

export const gdaxService = {
  getProductHistoricRates
};
