import React from 'react';

import { gdaxPublicApiService } from './';
import { restUrls } from '../helpers';

describe('gdaxPublicApiService', () => {
  for (let url in restUrls) {
    it('getProducts:' + url, async () => {
      const data = await gdaxPublicApiService.getProducts(restUrls[url]);
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
    it('getProducts:error:' + url, async () => {
      const data = await gdaxPublicApiService.getProducts('error');
      expect(data).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      );
    });
    it('getProductOrderBook:' + url, async () => {
      const data = await gdaxPublicApiService.getProductOrderBook(
        restUrls[url]
      );
      expect(data).toEqual(
        expect.objectContaining({
          sequence: expect.any(Number),
          bids: expect.any(Array),
          asks: expect.any(Array)
        })
      );
    });
    it('getProductOrderBook:error:' + url, async () => {
      const data = await gdaxPublicApiService.getProductOrderBook('error');
      expect(data).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      );
    });
    it('getProductTicker:' + url, async () => {
      const data = await gdaxPublicApiService.getProductTicker(restUrls[url]);
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
    it('getProductTicker:error:' + url, async () => {
      const data = await gdaxPublicApiService.getProductTicker('error');
      expect(data).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      );
    });
    it('getTrades:' + url, async () => {
      const data = await gdaxPublicApiService.getTrades(restUrls[url]);
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
    it('getTrades:error:' + url, async () => {
      const data = await gdaxPublicApiService.getTrades('error');
      expect(data).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      );
    });
    it('getHistoricRates:' + url, async () => {
      const data = await gdaxPublicApiService.getHistoricRates(restUrls[url]);
      expect(data).toEqual(expect.any(Array));
    });
    it('getHistoricRates:error:' + url, async () => {
      const data = await gdaxPublicApiService.getHistoricRates('error');
      expect(data).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      );
    });
    it('get24hrStats:' + url, async () => {
      const data = await gdaxPublicApiService.get24hrStats(restUrls[url]);
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
    it('get24hrStats:error:' + url, async () => {
      const data = await gdaxPublicApiService.get24hrStats('error');
      expect(data).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      );
    });
    it('getCurrencies:' + url, async () => {
      const data = await gdaxPublicApiService.getCurrencies(restUrls[url]);
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
    it('getCurrencies:error:' + url, async () => {
      const data = await gdaxPublicApiService.getCurrencies('error');
      expect(data).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      );
    });
    it('getTime:' + url, async () => {
      const data = await gdaxPublicApiService.getTime(restUrls[url]);
      expect(data).toEqual(
        expect.objectContaining({
          iso: expect.any(String),
          epoch: expect.any(Number)
        })
      );
    });
    it('getTime:error:' + url, async () => {
      const data = await gdaxPublicApiService.getTime('error');
      expect(data).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      );
    });
  }
});
