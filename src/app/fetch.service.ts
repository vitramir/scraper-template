import { Injectable } from '@nestjs/common';

type FetchParams = {
  headers?: Record<string, string>;
  [key: string]: any;
};

@Injectable()
export class FetchService {
  async get(url: string, params?: FetchParams) {
    return fetch(url, params);
  }

  async post(url: string, body: any, params?: FetchParams) {
    return fetch(url, {
      method: 'POST',
      body,
      ...params,
    });
  }
}
