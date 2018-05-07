import React from 'react';

import { gdaxService } from './';

describe('gdaxPublicApiService', () => {
  it('getProducts', async () => {
    const data = await gdaxService.getProducts();
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
        min_market_funds: expect.any(Object),
        max_market_funds: expect.any(Object),
        post_only: expect.any(Boolean),
        limit_only: expect.any(Boolean),
        cancel_only: expect.any(Boolean)
      })
    );
  });
  it('getProductOrderBook', async () => {
    const data = await gdaxService.getProductOrderBook();
    expect(data).toEqual(
      expect.objectContaining({
        sequence: expect.any(Number),
        bids: expect.any(Array),
        asks: expect.any(Array)
      })
    );
  });
  it('getProductTicker', async () => {
    const data = await gdaxService.getProductTicker();
    expect(data).toEqual(
      expect.objectContaining({
        trade_id: expect.any(Number),
        price: expect.any(String),
        size: expect.any(String),
        bid: expect.any(String),
        ask: expect.any(String),
        volume: expect.any(Number),
        time: expect.any(String)
      })
    );
  });
  it('getTrades', async () => {
    const data = await gdaxService.getTrades();
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
  it('getHistoricRates', async () => {
    const data = await gdaxService.getHistoricRates();
    expect(data).toEqual(expect.any(Array));
  });
  it('get24hrStats', async () => {
    const data = await gdaxService.get24hrStats();
    expect(data).toEqual(
      expect.objectContaining({
        open: expect.any(Number),
        high: expect.any(Number),
        low: expect.any(Number),
        volume: expect.any(Number),
        last: expect.any(Number),
        volume_30day: expect.any(String)
      })
    );
  });
  it('getCurrencies', async () => {
    const data = await gdaxService.getCurrencies();
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
  it('getTime', async () => {
    const data = await gdaxService.getTime();
    expect(data).toEqual(
      expect.objectContaining({
        iso: expect.any(String),
        epoch: expect.any(Number)
      })
    );
  });
});
