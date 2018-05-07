import React from 'react';

import { gdaxService } from './';
import { restUrls } from '../helpers';

describe('gdaxPublicApiService', () => {
  for (let url in restUrls) {
    it('getProducts:' + url, async () => {
      const data = await gdaxService.getProducts(restUrls[url]);
      expect(data).toContainEqual(
        expect.objectContaining({
          id: expect.any(String),
          base_currency: expect.any(String),
          quote_currency: expect.any(String),
          base_min_size: expect.any(String),
          base_max_size: expect.any(String),
          quote_increment: expect.any(String),
          display_name: expect.any(String),
          margin_enabled: expect.any(Boolean),
          status_message: expect.any(Object),
          min_market_funds: expect.any(String),
          max_market_funds: expect.any(String),
          post_only: expect.any(Boolean),
          limit_only: expect.any(Boolean),
          cancel_only: expect.any(Boolean)
        })
      );
    });
    it('getProductOrderBook:' + url, async () => {
      const data = await gdaxService.getProductOrderBook(restUrls[url]);
      expect(data).toEqual(
        expect.objectContaining({
          sequence: expect.any(Number),
          bids: expect.any(Array),
          asks: expect.any(Array)
        })
      );
    });
    it('getProductTicker:' + url, async () => {
      const data = await gdaxService.getProductTicker(restUrls[url]);
      expect(data).toEqual(
        expect.objectContaining({
          trade_id: expect.any(Number),
          price: expect.any(String),
          size: expect.any(String),
          bid: expect.any(String),
          ask: expect.any(String),
          volume: expect.anything(),
          time: expect.any(String)
        })
      );
    });
    it('getTrades:' + url, async () => {
      const data = await gdaxService.getTrades(restUrls[url]);
      expect(data).toContainEqual(
        expect.objectContaining({
          time: expect.any(String),
          trade_id: expect.any(Number),
          price: expect.any(String),
          size: expect.any(String),
          side: expect.any(String)
        })
      );
    });
    it('getHistoricRates:' + url, async () => {
      const data = await gdaxService.getHistoricRates(restUrls[url]);
      expect(data).toEqual(expect.any(Array));
    });
    it('get24hrStats:' + url, async () => {
      const data = await gdaxService.get24hrStats(restUrls[url]);
      expect(data).toEqual(
        expect.objectContaining({
          open: expect.anything(),
          high: expect.anything(),
          low: expect.anything(),
          volume: expect.anything(),
          last: expect.anything(),
          volume_30day: expect.any(String)
        })
      );
    });
    it('getCurrencies:' + url, async () => {
      const data = await gdaxService.getCurrencies(restUrls[url]);
      expect(data).toContainEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          min_size: expect.any(String),
          status: expect.any(String),
          message: expect.any(Object)
        })
      );
    });
    it('getTime:' + url, async () => {
      const data = await gdaxService.getTime(restUrls[url]);
      expect(data).toEqual(
        expect.objectContaining({
          iso: expect.any(String),
          epoch: expect.any(Number)
        })
      );
    });
  }
});
